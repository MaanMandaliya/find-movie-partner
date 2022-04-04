from utils.IMDbAPIUtils import *
from utils.DynamoDBUtils import *
import random

# def userGetKnownMovie(title):
#     url = f"https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/{title}/"
#     response = callIMDbAPI(url)
#     imdb_id = response['results'][0]['imdb_id']
#     url = f"https://data-imdb1.p.rapidapi.com/movie/id/{imdb_id}/"
#     response = callIMDbAPI(url)
#     return response['results']

# def userGetUnknownMovie(genres, year_duration):
#     results_dict = {}
#     for genre in genres:
#         for year in year_duration:
#             url = f"https://data-imdb1.p.rapidapi.com/movie/byYear/{year}/byGen/{genre}/"
#             querystring = {"page_size": "5"}
#             temp_result = callIMDbAPI(url, params=querystring)
#             for result_dict in temp_result['results']:
#                 imdb_id = result_dict['imdb_id']
#                 if imdb_id not in results_dict.keys():
#                     url = f"https://data-imdb1.p.rapidapi.com/movie/id/{imdb_id}/"
#                     temp_response = callIMDbAPI(url)
#                     image_url = temp_response['results']['image_url']
#                     results_dict[imdb_id] = [result_dict['title'], image_url]
#     return results_dict


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


def SaveKnownMovieRequest(movieRequest):
    actual_request = movieRequest['request']
    Item = {
        'RequestID': random.randint(1, 1000),
        'Username': movieRequest['Username'],
        'MovieRequest': actual_request,
        'RequestType': "Single",
        'Movies': [actual_request['title']],
        'isMatched': False
    }
    response = saveItem(Item)
    if response["ResponseMetadata"]['HTTPStatusCode'] == 200:
        return response


def SaveUnknownMovieRequest(movieRequest):
    actual_request = movieRequest['request']
    movies = []
    for value in actual_request.values():
        movies.append(value['title'])
    Item = {
        'RequestID': random.randint(1, 1000),
        'Username': movieRequest['Username'],
        'MovieRequest': actual_request,
        'RequestType': "Multiple",
        'Movies': movies,
        'isMatched': False
    }
    response = saveItem(Item)
    if response["ResponseMetadata"]['HTTPStatusCode'] == 200:
        return response


def GetMovieRequests(Username):
    response = queryItems('Username', Username)
    return response


def DeleteMovieRequest(RequestID, Username):
    Item = getItem(RequestID)
    if Item['Username'] == Username:
        response = deleteItem(RequestID)
        return response


def EditMovieRequest():
    pass


def GetProfile():
    pass


def SaveProfile():
    pass
