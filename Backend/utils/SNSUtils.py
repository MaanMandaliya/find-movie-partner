from configs import AWSConfig
import boto3

def get_sns():
    session = boto3.session.Session(aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY, aws_session_token=AWSConfig.AWS_SESSION_TOKEN)
    sns = session.client('sns', region_name='us-east-1')
    return sns

def subscribe_sns(TopicArn, Protocol, Endpoint):
    sns = get_sns()
    response = sns.subscribe(TopicArn=TopicArn, Protocol=Protocol, Endpoint=Endpoint)
    return response