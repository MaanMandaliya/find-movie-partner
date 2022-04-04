from urllib import response
from configs import AWSConfig
import boto3
from boto3.dynamodb.conditions import Key


def get_dynamodb():
    session = boto3.session.Session(aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY, aws_session_token=AWSConfig.AWS_SESSION_TOKEN)
    dynamodb = session.resource('dynamodb', region_name='us-east-1')
    return dynamodb


def saveItem(databaseItem):
    dynamodb = get_dynamodb()
    table = dynamodb.Table('User_Requests')
    response = table.put_item(
        Item=databaseItem
    )
    return response


def getItem(primarykey):
    dynamodb = get_dynamodb()
    table = dynamodb.Table('User_Requests')
    response = table.get_item(
        Key={'RequestID': primarykey}
    )
    return response['Item']


def queryItems(searchKey, searchValue):
    dynamodb = get_dynamodb()
    table = dynamodb.Table('User_Requests')
    response = table.scan(
        FilterExpression=Key(searchKey).eq(searchValue)
    )
    data = response['Items']
    while 'LastEvaluatedKey' in response:
        print("Entered")
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return {"Items": data}


def readAllItems():
    dynamodb = get_dynamodb()
    table = dynamodb.Table('User_Requests')
    response = table.scan()
    data = response['Items']
    while 'LastEvaluatedKey' in response:
        print("Entered")
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return {"Items": data}


def deleteItem(primarykey):
    dynamodb = get_dynamodb()
    table = dynamodb.Table('User_Requests')
    response = table.delete_item(
        Key={'RequestID': primarykey}
    )
    return response
