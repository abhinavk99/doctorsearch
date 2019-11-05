import os

import flask_restless
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

from models import db, City, Doctor, Specialty

load_dotenv()

application = Flask(__name__)
application.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
application.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(application)

db.init_app(application)

manager = flask_restless.APIManager(application, flask_sqlalchemy_db=db)
city_blueprint = manager.create_api(City, results_per_page=9)
doctor_blueprint = manager.create_api(Doctor, results_per_page=9)
specialty_blueprint = manager.create_api(Specialty, results_per_page=10)


@application.route("/")
def index():
    response = jsonify(
        {
            "status": 200,
            "message": "Welcome to the DoctorSearch API! The documentation is at https://documenter.getpostman.com/view/9000368/SVtbPkAt. Check our our website https://doctorsearch.me as well.",
        }
    )
    response.status_code = 200
    return response


if __name__ == "__main__":
    application.run()
