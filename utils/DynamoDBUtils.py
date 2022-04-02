from configs import AWSConfig
import boto3

def get_dynamodb():
    session = boto3.session.Session(aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY, aws_session_token=AWSConfig.AWS_SESSION_TOKEN)
    client = session.client('dynamodb')

def saveMovieRequest(request):
    pass

def getMovieRequests():
    pass
