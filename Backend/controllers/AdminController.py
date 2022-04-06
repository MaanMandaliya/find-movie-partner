from utils.DynamoDBUtils import *
from utils.SNSUtils import *
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
    Item = readItem("RequestID", RequestID, 'User_Requests')
    message, status_code = deleteItem("RequestID", RequestID, 'User_Requests')
    SubscriptionArn = Item['SubscriptionArn']
    response = unsubscribe_topic(SubscriptionArn)
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return jsonify(message=message, status_code=status_code)
    else:
        return jsonify(message="error occured in deleting request", status_code=404)

def GetUserProfiles():
    response = readAllItems("User_Profile")
    return response