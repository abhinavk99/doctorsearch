import os

import flask_restless
from dotenv import load_dotenv
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from models import City, Doctor, Specialty, Base

load_dotenv()

application = Flask(__name__)
engine = create_engine(os.getenv("DATABASE_URI"))
session_factory = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = scoped_session(session_factory)
Base.metadata.bind = engine

manager = flask_restless.APIManager(application, session=session)
city_blueprint = manager.create_api(City, results_per_page=9)
doctor_blueprint = manager.create_api(Doctor, results_per_page=9)
specialty_blueprint = manager.create_api(Specialty, results_per_page=9)


@application.route("/")
def index():
    response = jsonify(
        {
            "status": 200,
            "message": "Welcome to the DoctorSearch API! Check our our website https://doctorsearch.me as well.",
        }
    )
    response.status_code = 200
    return response


if __name__ == "__main__":
    application.run()
