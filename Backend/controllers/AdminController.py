from utils.DynamoDBUtils import *


def GetAllUserMovieRequests():
    response = readAllItems('User_Requests')
    return response


def AddFeedback(RequestID, Feedback):
    response = updateItem("Feedback", Feedback, RequestID, 'User_Requests')
    return response


def EditMovieRequest(NewRequest, RequestID):
    message, status_code = updateItem(
        "MovieRequest", NewRequest, RequestID, 'User_Requests')
    if status_code == 200:
        Movies = []
        if "1" in NewRequest:
            for value in NewRequest.values():
                Movies.append(value['title'])
                RequestType = "Multiple"
        else:
            Movies.append(NewRequest['title'])
            RequestType = "Single"
        message, status_code = updateItem(
            "Movies", Movies, RequestID, 'User_Requests')
        if status_code == 200:
            message, status_code = updateItem(
                "RequestType", RequestType, RequestID, 'User_Requests')
            if status_code == 200:
                return message, status_code
    else:
        return "Error Occured during update", 404


def DeleteMovieRequest(RequestID):
    response = deleteItem("RequestID", RequestID, 'User_Requests')
    return response
