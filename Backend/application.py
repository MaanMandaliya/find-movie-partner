from flask import Flask, request
from controllers import AdminController
from controllers import UserController

app = Flask(__name__)

# User Features


@app.route('/User/KnownMovie', methods=['POST'])
def userGetKnownMovie():
    title = request.json['title']
    response = UserController.GetKnownMovie(title)
    return response


@app.route('/User/SaveKnownMovie', methods=['POST'])
def userSaveKnownMovieRequest():
    movieRequest = request.json
    response = UserController.SaveKnownMovieRequest(movieRequest)
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
    response = UserController.SaveUnknownMovieRequest(movieRequest)
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


@app.route('/User/EditMovieRequest', methods=['UPDATE'])
def userEditMovieRequest():
    pass


@app.route('/User/GetProfile', methods=['GET'])
def userGetProfile():
    pass


@app.route('/User/SaveProfile', methods=['POST'])
def userSaveProfile():
    pass

# Admin Features


@app.route('/Admin/GetMovieRequests', methods=['GET'])
def adminGetAllUserMovieRequests():
    response = AdminController.GetAllUserMovieRequests()
    return response


@app.route('/Admin/EditMovieRequest', methods=['UPDATE'])
def adminEditMovieRequest():
    pass


@app.route('/Admin/DeleteMovieRequest', methods=['POST'])
def adminDeleteMovieRequest():
    RequestID = request.json['RequestID']
    response = AdminController.DeleteMovieRequest(RequestID)
    return response


if __name__ == "__main__":
    app.run(debug=True)
