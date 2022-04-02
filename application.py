from flask import Flask
from controllers import AdminController
from controllers import UserController
app = Flask(__name__)


@app.route('/User/KnownMovie')
def userKnownMovie():
    return "index"


if __name__ == "__main__":
    app.run(debug=True)
