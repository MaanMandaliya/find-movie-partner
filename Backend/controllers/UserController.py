from urllib import response
from flask import jsonify
from utils.IMDbAPIUtils import *
from utils.DynamoDBUtils import *
from utils.SNSUtils import *
import random
import re


def GetKnownMovie(title):
    url = f"https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/{title}/"
    response = callIMDbAPI(url)
    imdb_id = response['results'][0]['imdb_id']
    url = f"https://data-imdb1.p.rapidapi.com/movie/id/{imdb_id}/"
    response = callIMDbAPI(url)
    response = response['results']
    response_dict = {'imdb_id': response['imdb_id'],
                     'title': response['title'], 'image_url': response['image_url']}
    return response_dict


def GetUnknownMovie(genres, year_duration):
    results_dict = {}
    imdb_ids = []
    count = 1
    for genre in genres:
        for year in year_duration:
            url = f"https://data-imdb1.p.rapidapi.com/movie/byYear/{year}/byGen/{genre}/"
            querystring = {"page_size": "5"}
            temp_result = callIMDbAPI(url, params=querystring)
            for result_dict in temp_result['results']:
                imdb_id = result_dict['imdb_id']
                if imdb_id not in imdb_ids:
                    imdb_ids.append(imdb_id)
                    url = f"https://data-imdb1.p.rapidapi.com/movie/id/{imdb_id}/"
                    temp_response = callIMDbAPI(url)
                    image_url = temp_response['results']['image_url']
                    result_dict.update({'image_url': image_url})
                    results_dict[count] = result_dict
                    count += 1
    return results_dict


def SaveMovieRequest(movieRequest):
    actual_request = movieRequest['request']
    Email = movieRequest['Email']
    movie = actual_request['title']
    # Check SNS Subscriptions and send email
    topics = get_sns_topic_names()
    movie = re.sub('\W+', '', movie)
    # If topic does not exist then create it
    if movie not in topics:
        topic_arn = create_sns_topic(movie)
    # If topic does exist then get topic arn
    else:
        topic_arn = get_sns_topic_arn(movie)
    response = subscribe_sns(
        TopicArn=topic_arn, Protocol="email", Endpoint=Email)
    # Subscription ARN, it will be required to unsubscribe
    Item = {
        'RequestID': random.randint(1, 1000),
        'Username': movieRequest['Username'],
        'MovieRequest': actual_request,
        'Movie': movie,
        "SubscriptionArn":response['SubscriptionArn'],
        "TopicArn":topic_arn
    }
    message, status_code = createItem(Item, 'User_Requests')
    if status_code == 200:
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            message += f". Suscription email has been sent to you. Please accept to find a movie partner for {movie}"
            return jsonify(message=message, status_code=200)
    else:
        return jsonify(message="Error Occured", status_code=404)

def GetMovieRequests(Username):
    response = queryItems('Username', Username, 'User_Requests')
    return response


def DeleteMovieRequest(RequestID, Username):
    Item = readItem("RequestID", RequestID, 'User_Requests')
    if Item['Username'] == Username:
        message, status_code = deleteItem(
            "RequestID", RequestID, 'User_Requests')
        SubscriptionArn = Item['SubscriptionArn']
        response = unsubscribe_topic(SubscriptionArn)
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return jsonify(message=message, status_code=status_code)
        else:
            return jsonify(message="error occured in deleting request", status_code=404)


def AddRatings(RequestID, Ratings, Username):
    Item = readItem("RequestID", RequestID, 'User_Requests')
    if Item['Username'] == Username:
        message, status_code = updateItem(
            "Ratings", Ratings, RequestID, 'User_Requests')
        return jsonify(message=message, status_code=status_code)
    else:
        return jsonify(message="Access Denied", status_code=404)


def EditMovieRequest(NewRequest, RequestID, Username):
    Item = readItem("RequestID", RequestID, 'User_Requests')
    if Item['Username'] == Username:
        message, status_code = updateItem(
            "MovieRequest", NewRequest, RequestID, 'User_Requests')
        if status_code == 200:
            message, status_code = updateItem(
                "Movie", NewRequest['title'], RequestID, 'User_Requests')
            if status_code == 200:
                return jsonify(message=message, status_code=status_code)
            else:
                return jsonify(message="Error Occured", status_code=404)
        else:
            return jsonify(message="Error Occured", status_code=404)
    else:
        return jsonify(message="Access Denied", status_code=404)


def GetProfile(Username):
    response = readItem("Username", Username, "User_Profile")
    return response


def SaveProfile(profile):
    # Item = {
    #     "Username": profile['Username'],
    #     "Email": profile['Email'],
    #     "Phone": profile['Phone'],
    #     "Age": profile['Age'],
    #     "Gender": profile['Gender'],
    #     "Social Media Profiles": {
    #         "Instagram": profile['SocialMedia']['Instagram'],
    #         "Facebook": profile['SocialMedia']['Facebook']
    #     },
    #     "OTT Subscriptions": {
    #         "Hotstar": profile['OTT']['Hotstar'],
    #         "Netflix": profile['OTT']['Netflix'],
    #         "Amazon Prime": profile['OTT']['Prime']
    #     }
    # }
    Item = {
        "Username": profile['Username'],
        "Email": profile['Email'],
        "Phone": profile['Phone'],
        "Age": profile['Age']
    }
    message, status_code = createItem(Item, 'User_Profile')
    return jsonify(message=message, status_code=status_code)