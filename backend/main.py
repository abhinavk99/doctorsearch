import os

import flask_restless
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from attributes import SEARCH_ATTRIBUTES, SERIALIZE_ATTRIBUTES
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


def serialize(item, attributes):
    response_json = {}
    for attr in attributes:
        response_json[attr] = getattr(item, attr)
    return response_json


def search_item(query, item, attributes):
    for attr in attributes:
        attr_val = getattr(item, attr)
        if attr_val is not None and query in str(attr_val).lower():
            return True
    return False


def search_model(search_query, items_query, search_attributes, serialize_attributes):
    return [
        serialize(item, serialize_attributes)
        for item in items_query.all()
        if search_item(search_query, item, search_attributes)
    ]


@application.route("/api/search")
def search():
    """
    Used to search all of the instances given a query
    Example: api.doctorsearch.me/api/search?q=dermatologist
    """
    search_query = request.args.get("q")

    if search_query is None or len(search_query) < 1:
        response_json = {"status": 422}
        if search_query is None:
            response_json["message"] = "Search query not found. Use ?q=searchquery."
        else:
            response_json["message"] = "Search query length must be at least 1."
        response = jsonify(response_json)
        response.status_code = 422
        return response

    search_query = search_query.lower()
    response_json = {"status": 200}

    model_queries = {
        "cities": City.query,
        "doctors": Doctor.query,
        "specialties": Specialty.query,
    }
    for model_name in ["cities", "doctors", "specialties"]:
        response_json[model_name] = search_model(
            search_query,
            model_queries[model_name],
            SEARCH_ATTRIBUTES[model_name],
            SERIALIZE_ATTRIBUTES[model_name],
        )
        response_json[f"num_{model_name}"] = len(response_json[model_name])

    response_json["num_results"] = sum(
        response_json[attr] for attr in ["num_cities", "num_doctors", "num_specialties"]
    )

    response_json["page"] = 1
    response_json["total_pages"] = 1
    response = jsonify(response_json)
    response.status_code = 200
    return response


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
