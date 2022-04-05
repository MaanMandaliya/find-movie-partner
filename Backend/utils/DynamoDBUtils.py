from configs import AWSConfig
import boto3
from boto3.dynamodb.conditions import Key


def get_dynamodb():
    session = boto3.session.Session(aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY, aws_session_token=AWSConfig.AWS_SESSION_TOKEN)
    dynamodb = session.resource('dynamodb', region_name='us-east-1')
    return dynamodb


def createItem(databaseItem, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.put_item(
        Item=databaseItem
    )
    if response["ResponseMetadata"]['HTTPStatusCode'] == 200:
        return "Successfully Request Inserted", 200
    else:
        return "Error Occured Request not inserted", 404


def readItem(primaryKeyName, primaryKeyValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.get_item(
        Key={primaryKeyName: primaryKeyValue}
    )
    return response['Item']


def queryItems(searchKey, searchValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.scan(
        FilterExpression=Key(searchKey).eq(searchValue)
    )
    data = response['Items']
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return {"Items": data}


def readAllItems(TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.scan()
    data = response['Items']
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return {"Items": data}


def updateItem(updateKey, updateValue, primaryKeyValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.update_item(
        Key={"RequestID": primaryKeyValue},
        UpdateExpression=f"SET {updateKey}= :newKey",
        ExpressionAttributeValues={
            ':newKey': updateValue
        },
        ReturnValues="UPDATED_NEW")
    updateDict = {updateKey: updateValue}
    if response['Attributes'] == updateDict and response["ResponseMetadata"]['HTTPStatusCode'] == 200:
        return "Successfully Request Updated", 200
    else:
        return "Error Occured Data not updated", 404


def deleteItem(primaryKeyName, primaryKeyValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.delete_item(
        Key={primaryKeyName: primaryKeyValue}
    )
    if response["ResponseMetadata"]['HTTPStatusCode'] == 200:
        return "Successfully Request Deleted", 200
    else:
        return "Error Occured Data not deleted", 404
