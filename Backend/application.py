from flask import Flask, request
from flask_cors import CORS
from controllers import AdminController
from controllers import UserController

app = Flask(__name__)
CORS(app)

# User Features


@app.route('/User/KnownMovie', methods=['POST'])
def userGetKnownMovie():
    title = request.json['title']
    response = UserController.GetKnownMovie(title)
    return response


@app.route('/User/SaveKnownMovie', methods=['POST'])
def userSaveKnownMovieRequest():
    movieRequest = request.json
    response = UserController.SaveMovieRequest(movieRequest)
    return response


@app.route('/User/UnknownMovie', methods=['POST'])
def userGetUnknownMovie():
    genres = request.json['genres']
    year_duration = request.json['year_duration']
    response = UserController.GetUnknownMovie(genres, year_duration)
    return response


@app.route('/User/SaveUnknownMovie', methods=['POST'])
def userSaveUnknownMovieRequest():
    movieRequest = request.json
    response = UserController.SaveMovieRequest(movieRequest)
    return response


@app.route('/User/GetMovieRequests', methods=['POST'])
def userGetMovieRequests():
    Username = request.json['Username']
    response = UserController.GetMovieRequests(Username)
    return response


@app.route('/User/DeleteMovieRequest', methods=['POST'])
def userDeleteMovieRequest():
    RequestID = request.json['RequestID']
    Username = request.json['Username']
    response = UserController.DeleteMovieRequest(RequestID, Username)
    return response


@app.route('/User/EditMovieRequest', methods=['POST'])
def userEditMovieRequest():
    RequestID = request.json['RequestID']
    Username = request.json['Username']
    pass

#check the request persist to user or not
@app.route('/User/AddRatings', methods=['POST'])
def userAddRatings():
    RequestID = request.json['RequestID']
    Ratings = request.json['Ratings']
    response = UserController.AddRatings(RequestID, Ratings)
    return response

@app.route('/User/GetProfile', methods=['POST'])
def userGetProfile():
    Username = request.json['Username']
    response = UserController.GetProfile(Username)
    return response


@app.route('/User/SaveProfile', methods=['POST'])
def userSaveProfile():
    profile = request.json
    response = UserController.SaveProfile(profile)
    return response

# Admin Features


@app.route('/Admin/GetMovieRequests', methods=['GET'])
def adminGetAllUserMovieRequests():
    response = AdminController.GetAllUserMovieRequests()
    return response


@app.route('/Admin/EditMovieRequest', methods=['UPDATE'])
def adminEditMovieRequest():
    pass

@app.route('/Admin/AddFeedback', methods=['POST'])
def adminAddFeedback():
    Feedback = request.json['Feedback']
    RequestID = request.json['RequestID']
    response = AdminController.AddFeedback(RequestID, Feedback)
    return response

@app.route('/Admin/DeleteMovieRequest', methods=['POST'])
def adminDeleteMovieRequest():
    RequestID = request.json['RequestID']
    response = AdminController.DeleteMovieRequest(RequestID)
    return response


if __name__ == "__main__":
    app.run(debug=True)
