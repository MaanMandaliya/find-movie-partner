from utils.DynamoDBUtils import *
from flask import jsonify


def GetAllUserMovieRequests():
    response = readAllItems('User_Requests')
    return response


def AddFeedback(RequestID, Feedback):
    message, status_code = updateItem("Feedback", Feedback, RequestID, 'User_Requests')
    return jsonify(message=message, status_code=status_code)


def EditMovieRequest(NewRequest, RequestID):
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


def DeleteMovieRequest(RequestID):
    message, status_code = deleteItem("RequestID", RequestID, 'User_Requests')
    return jsonify(message=message, status_code=status_code)
