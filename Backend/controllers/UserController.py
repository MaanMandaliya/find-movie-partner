from utils.IMDbAPIUtils import *
from utils.DynamoDBUtils import *
import random


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
    requestType = None
    movies = []
    if "1" in actual_request:
        for value in actual_request.values():
            movies.append(value['title'])
            requestType = "Multiple"
    else:
        movies.append(actual_request['title'])
        requestType = "Single"
    Item = {
        'RequestID': random.randint(1, 1000),
        'Username': movieRequest['Username'],
        'MovieRequest': actual_request,
        'RequestType': requestType,
        'Movies': movies,
        'isMatched': False
    }
    response = createItem(Item, 'User_Requests')
    return response

def GetMovieRequests(Username):
    response = queryItems('Username', Username, 'User_Requests')
    return response


def DeleteMovieRequest(RequestID, Username):
    Item = readItem("RequestID", RequestID, 'User_Requests')
    if Item['Username'] == Username:
        response = deleteItem("RequestID", RequestID, 'User_Requests')
        return response


def AddRatings(RequestID, Ratings):
    response = updateItem("Ratings", Ratings, RequestID, 'User_Requests')
    return response


def EditMovieRequest(NewRequest, RequestID, Username):
    Item = readItem("RequestID", RequestID, 'User_Requests')
    if Item['Username'] == Username: 
        message, status_code = updateItem("MovieRequest",NewRequest,RequestID,'User_Requests')
        if status_code == 200:
            Movies = []
            if "1" in NewRequest:
                for value in NewRequest.values():
                    Movies.append(value['title'])
                    RequestType = "Multiple"
            else:
                Movies.append(NewRequest['title'])
                RequestType = "Single"
            message, status_code = updateItem("Movies",Movies,RequestID,'User_Requests')
            message, status_code = updateItem("RequestType",RequestType,RequestID,'User_Requests')
            if status_code == 200:
                return message, status_code
    else:
        return "Access Denied", 404

def GetProfile(Username):
    response = readItem("Username", Username, "User_Profile")
    return response


def SaveProfile(profile):
    Item = {
        "Username": profile['Username'],
        "Email": profile['Email'],
        "Age": profile['Age'],
        "Gender": profile['Gender'],
        "Social Media Profiles": {
            "Instagram": profile['SocialMedia']['Instagram'],
            "Facebook": profile['SocialMedia']['Facebook']
        },
        "OTT Subscriptions": {
            "Hotstar": profile['OTT']['Hotstar'],
            "Netflix": profile['OTT']['Netflix'],
            "Amazon Prime": profile['OTT']['Prime']
        }
    }
    response = createItem(Item, 'User_Profile')
    return response
