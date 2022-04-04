from utils.DynamoDBUtils import *


def GetAllUserMovieRequests():
    response = readAllItems()
    return response


def EditMovieRequest():
    pass


def DeleteMovieRequest(RequestID):
    response = deleteItem(RequestID)
    return response
