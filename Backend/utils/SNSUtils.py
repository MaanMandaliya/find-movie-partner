from flask import jsonify
from configs import AWSConfig
import boto3


def get_sns():
    session = boto3.session.Session(aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY, aws_session_token=AWSConfig.AWS_SESSION_TOKEN)
    sns = session.client('sns', region_name='us-east-1')
    return sns


def subscribe_sns(TopicArn, Protocol, Endpoint):
    sns = get_sns()
    response = sns.subscribe(
        TopicArn=TopicArn, Protocol=Protocol, Endpoint=Endpoint, ReturnSubscriptionArn=True)
    return response


def get_sns_topic_names():
    sns = get_sns()
    response = sns.list_topics()
    topic_arn_dict_list = response['Topics']
    topics = []
    for topic_arn_dict in topic_arn_dict_list:
        topic_arn = topic_arn_dict['TopicArn']
        topic = topic_arn.rsplit(":")[-1]
        topics.append(topic)
    return topics


def publish_message_by_email(TopicArn, Message, Subject):
    sns = get_sns()
    response = sns.publish(TopicArn=TopicArn, Message=Message, Subject=Subject)
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        return jsonify(message="Successfully message sent by email", status_code=200)
    else:
        return jsonify(message="Error Occured", status_code=404)


def publish_message_by_phone(PhoneNumber, Message):
    # sends message without subscription
    sns = get_sns()
    response = sns.publish(PhoneNumber=PhoneNumber, Message=Message)
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        return jsonify(message="Successfully message sent by email", status_code=200)
    else:
        return jsonify(message="Error Occured", status_code=404)


def get_sns_topic_arn(topicName):
    sns = get_sns()
    response = sns.list_topics()
    topic_arn_dict_list = response['Topics']
    for topic_arn_dict in topic_arn_dict_list:
        topic_arn = topic_arn_dict['TopicArn']
        topic = topic_arn.rsplit(":")[-1]
        if topic == topicName:
            return topic_arn


def create_sns_topic(topic_name):
    sns = get_sns()
    response = sns.create_topic(Name=topic_name)
    topic_arn = response["TopicArn"]
    return topic_arn


def get_subscriptions(topic_arn):
    sns = get_sns()
    topic = sns.get_topic_attributes(topic_arn)
    return topic['Attributes']['SubscriptionsConfirmed']

def unsubscribe_topic(SubscriptionArn):
    sns = get_sns()
    response = sns.unsubscribe(SubscriptionArn=SubscriptionArn)
    return response
