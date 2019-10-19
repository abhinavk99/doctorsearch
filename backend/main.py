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
    response = jsonify({"status": 200, "message": "DoctorSearch API"})
    response.status_code = 200
    return response


application.run(debug=True, host="0.0.0.0", port=5000)
