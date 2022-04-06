import json
import boto3
import time

AWS_ACCESS_KEY_ID = 'ASIARJWTOK3Q7RE34P6I'
AWS_SECRET_ACCESS_KEY = '4NsTVC0ulG8IR4EFBtOByyYWDTh6scxdnDGFX6us'
AWS_SESSION_TOKEN = 'FwoGZXIvYXdzEBIaDCOHyS7fuUlp8ZVSSCLAAR8inJaexbwn2lI97vaJYI/iFUer7zCjVjvIcfUA7NvG1T6n3Nk6PZe864OrFRW9uwVBeMrAAUdysI9p4xKP87zAiQ4XwndjTK0z8VvU9vXQz7k1cOdCJcm3v9e6VnclLy7oAVm+15IZIsvRPg9AMlGy/OPRUkFjMwzDtla6cHLnnMjGA2NsL/Btwa1ZxbeWpDCYpg4B0J7KMDa1oLhGy/GeToHyWEIDpJ3qQv+SIOtrQm4EcIgAHYCMPfR7iwylnyiKu7OSBjItFsakeRnruTESFFbdEMyKL7a0b/VAB8TAWg3LsQvocMq52MpB3+L+rIQ89imn'

# SNS Utils


def get_sns():
    session = boto3.session.Session(aws_access_key_id=AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY, aws_session_token=AWS_SESSION_TOKEN)
    sns = session.client('sns', region_name='us-east-1')
    return sns


def publish_message(TopicArn, UserProfile, Subject, movie):
    sns = get_sns()
    Message = f"You found a movie partner for {movie}. Profile of matched user is attached below\n"
    Message += str(UserProfile)
    response = sns.publish(TopicArn=TopicArn, Message=Message, Subject=Subject)
    return response


def unsubscribe_topic(SubscriptionArn):
    sns = get_sns()
    response = sns.unsubscribe(SubscriptionArn=SubscriptionArn)
    return response

# DynamoDB Utils


def get_dynamodb():
    session = boto3.session.Session(aws_access_key_id=AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY, aws_session_token=AWS_SESSION_TOKEN)
    dynamodb = session.resource('dynamodb', region_name='us-east-1')
    return dynamodb


def readAllItems(TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.scan()
    data = response['Items']
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return {"Items": data}


def readItem(primaryKeyName, primaryKeyValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.get_item(
        Key={primaryKeyName: primaryKeyValue}
    )
    return response['Item']


def deleteItem(primaryKeyName, primaryKeyValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.delete_item(
        Key={primaryKeyName: primaryKeyValue}
    )
    return response

# Lambda Function


def lambda_handler(event, context):
    Records = event['Records']
    for Record in Records:
        print("1: Reached in Records")
        if Record["eventName"] == "INSERT":
            print("2: Found INSERT Operation")
            NewImage = Record['dynamodb']['NewImage']
            # Check if other user of this movie exists or not
            selected_movie = NewImage['Movie']['S']
            MatchingUsername = NewImage['Username']['S']
            Items = readAllItems('User_Requests')
            Items = Items['Items']
            Exist = False

            # If table has more than 1 record
            if len(Items) > 1:
                print("3: Table Found more than 1 record")
                print(Items)
                for Item in Items:
                    print(
                        f"Movie Comparison after 3: {selected_movie} and {Item['Movie']}")
                    if selected_movie == Item['Movie'] and NewImage['RequestID']['N'] != str(Item['RequestID']):
                        print(
                            f"Between 3 and 4: Same movie found : {Item['Movie']}")
                        print(
                            f"Request IDs are {type(NewImage['RequestID']['N'])} and {type(Item['RequestID'])}")
                        print(
                            f"Request IDs are {NewImage['RequestID']['N']} and {Item['RequestID']}")
                        Exist = True
                        MatchedUsername = Item['Username']
                        MatchedUserItem = Item
                        time.sleep(1)
                    else:
                        print(f"Movie Comparison after 3: Same RequestID")
            else:
                print("4: Table Found only 1 record")
                return {
                    'statusCode': 200,
                    'body': json.dumps(f'Not Enough data in table to find a match !')
                }

            # If same movie exist in another record in table
            Success = False
            if Exist:
                print("5: User Request exists with same movie")
                # Get user profiles
                MatchingUserProfile = readItem(
                    "Username", MatchingUsername, "User_Profile")
                MatchedUserProfile = readItem(
                    "Username", MatchedUsername, "User_Profile")

                # Send Email to each user with other user information
                print("7: Sending Email to each user")
                TopicArn = NewImage['TopicArn']['S']
                Subject = f"Found a Movie Partner for {selected_movie}"
                print(f"After 7: MatchingUserProfile: {MatchingUserProfile}")
                print(f"After 7: MatchedUserProfile: {MatchedUserProfile}")
                print("100 Seconds of Sleep to maintain the concurrency of subscription")
                time.sleep(30)
                MatchingUserResponse = publish_message(
                    TopicArn=TopicArn, UserProfile=MatchedUserProfile, Subject=Subject, movie=selected_movie)
                MatchedUserResponse = publish_message(
                    TopicArn=TopicArn, UserProfile=MatchingUserProfile, Subject=Subject, movie=selected_movie)
                if MatchedUserResponse['ResponseMetadata']['HTTPStatusCode'] == 200 and MatchingUserResponse['ResponseMetadata']['HTTPStatusCode'] == 200:
                    Success = True
                    print("8: Successfully Email sent to users")
                else:
                    print("9: Error Occured in sending Email to users")
                    return {
                        'statusCode': 404,
                        'body': json.dumps(f'Could not send email to users. Error Occured in Lambda !')
                    }

                # Unsubscribe to Topic for all users
                if Success:
                    print("10: Unsubscribing Users from Topic")
                    MatchingUserSubscriptionArn = NewImage['SubscriptionArn']['S']
                    MatchedUserSubscriptionArn = MatchedUserItem['SubscriptionArn']
                    MatchingUserUnsubscribeResponse = unsubscribe_topic(
                        MatchingUserSubscriptionArn)
                    MatchedUserUnsubscribeResponse = unsubscribe_topic(
                        MatchedUserSubscriptionArn)
                    if MatchingUserUnsubscribeResponse['ResponseMetadata']['HTTPStatusCode'] == 200 and MatchedUserUnsubscribeResponse['ResponseMetadata']['HTTPStatusCode'] == 200:
                        print("11: Users are successfully unsubscribed from topic")
                        # After successfull email sent, delete those requests from table
                        ID1 = int(NewImage['RequestID']['N'])
                        ID2 = MatchedUserItem['RequestID']
                        print(
                            f"Request ID Types: 1: {type(ID1)}, 2: {type(ID2)} to delete requests")
                        print(
                            f"Request IDs: 1: {ID1}, 2: {ID2} to delete requests")
                        MatchingUserLastResponse = deleteItem(
                            "RequestID", ID1, 'User_Requests')
                        MatchedUserLastResponse = deleteItem(
                            "RequestID", ID2, 'User_Requests')
                        if MatchingUserLastResponse["ResponseMetadata"]['HTTPStatusCode'] == 200 and MatchedUserLastResponse["ResponseMetadata"]['HTTPStatusCode'] == 200:
                            print("12: User Requests deleted !")
                            return {
                                'statusCode': 200,
                                'body': json.dumps(f'Email Sent to Both users for movie invite. Lambda Executed Succesfully !')
                            }
                        else:
                            print("13: Error ! User Requests not deleted !")
                            return {
                                'statusCode': 404,
                                'body': json.dumps(f'Error occured during deleting user requests at last !')
                            }
                    else:
                        print("11: Error Occured in unsubscribing users from topic")
                        return {
                            'statusCode': 404,
                            'body': json.dumps(f'Error occured during unsubscribe !')
                        }
            else:
                print("6: User Request does not exist with same movie")
                return {
                    'statusCode': 404,
                    'body': json.dumps(f'Same Movie => {selected_movie} does not have copy in table !')
                }
        else:
            print("0: Record type is not INSERT")
            return {
                'statusCode': 200,
                'body': json.dumps(f'Record type is not INSERT. No need to invoke Lambda !')
            }
    print("12: Successfully completed Lambda! ")
