from utils.DynamoDBUtils import *


def GetAllUserMovieRequests():
    response = readAllItems()
    return response

def AddFeedback(RequestID, Feedback):
    response = updateItem("Feedback", Feedback, RequestID, 'User_Requests')
    return response

def EditMovieRequest():
    pass


def DeleteMovieRequest(RequestID):
    response = deleteItem(RequestID)
    return response
