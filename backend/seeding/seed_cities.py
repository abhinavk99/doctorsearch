import os
import sys
import time
from pprint import pprint

import requests
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append("../")
from models import City

# Change this to seed new cities
cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "San Francisco",
    "Charlotte",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington, D.C.",
    "Boston",
    "El Paso",
    "Detroit",
    "Nashville",
    "Portland",
    "Memphis",
    "Oklahoma City",
    "Las Vegas",
    "Louisville",
    "Baltimore",
    "Milwaukee",
    "Albuquerque",
    "Tucson",
    "Fresno",
    "Mesa",
    "Sacramento",
    "Atlanta",
    "Kansas City",
    "Colorado Springs",
    "Miami",
    "Raleigh",
    "Omaha",
    "Long Beach",
    "Virginia Beach",
    "Oakland",
    "Minneapolis",
    "Tulsa",
    "Arlington",
    "Tampa",
    "New Orleans",
]


def build_city(city_name):
    cities_resp = requests.get(
        "http://geodb-free-service.wirefreethought.com/v1/geo/cities?countryIds=US&minPopulation=210000&namePrefix="
        + city_name
    ).json()
    city_resp = requests.get(
        "http://geodb-free-service.wirefreethought.com/v1/geo/cities/"
        + str(cities_resp["data"][0]["id"])
    ).json()
    data = city_resp["data"]
    pprint(data["name"] + " " + data["regionCode"])
    city = City(
        name=data["name"],
        country=data["country"],
        country_code=data["countryCode"],
        elevation_meters=data["elevationMeters"],
        latitude=data["latitude"],
        longitude=data["longitude"],
        population=data["population"],
        region=data["region"],
        region_code=data["regionCode"],
        timezone=data["timezone"],
    )
    return city


if __name__ == "__main__":
    load_dotenv()

    DB_URI = os.getenv("DATABASE_URI")

    db = create_engine(DB_URI)

    Session = sessionmaker(db)
    session = Session()

    for city_name in cities:
        city = build_city(city_name)
        session.add(city)
        time.sleep(1)
    session.commit()
