import re
from flask import Flask, request
from controllers import AdminController
from controllers import UserController
import requests, json

app = Flask(__name__)


@app.route('/User/KnownMovie', methods=['GET'])
def userGetKnownMovie():
    title = request.json['title']
    response = UserController.userGetKnownMovie(title)
    return response

@app.route('/User/SaveKnownMovie', methods=['POST'])
def userSaveKnownMovie():
    pass

@app.route('/User/UnknownMovie', methods=['GET'])
def userGetUnknownMovie():
    genres = request.json['genres']
    year_duration = request.json['year_duration']
    response = UserController.userGetUnknownMovie(genres, year_duration)
    return response

@app.route('/User/SaveUnknownMovie', methods=['GET'])
def userSaveUnknownMovie():
    pass

def callIMDbAPI(url, params=None):
    headers = {
        'x-rapidapi-key': "51e8684284mshcba7311dbcd2224p19ba27jsnfe3887514360",
        'x-rapidapi-host': "data-imdb1.p.rapidapi.com"
    }
    if params:
        response = requests.request("GET", url, headers=headers, params=params)
    else:
        response = requests.request("GET", url, headers=headers)
    return json.loads(response.text)

@app.route('/test')
def test():
    year = request.json['year']
    genre = request.json['genre']
    url = f"https://data-imdb1.p.rapidapi.com/movie/byYear/{year}/byGen/{genre}/"
    querystring = {"page_size": "5"}
    return callIMDbAPI(url, params=querystring)


@app.route('/test2')
def test2():
    year = request.json['year']
    genre = request.json['genre']
    url = f"https://data-imdb1.p.rapidapi.com/movie/byYear/{year}/byGen/{genre}/"
    querystring = {"page_size": "5"}
    return callIMDbAPI(url, params=querystring)



if __name__ == "__main__":
    app.run(debug=True)
