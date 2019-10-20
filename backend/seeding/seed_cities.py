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

    # Add photos to cities that have photos in teleport API
    city_map = {city.name: city for city in session.query(City).all()}
    photos_resp = requests.get(
        "https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images"
    ).json()
    photos_map = {item["name"]: item for item in photos_resp["_embedded"]["ua:item"]}
    for city_name in cities:
        for photo_city_name in photos_map:
            if city_name in photo_city_name and photo_city_name != "Portland, ME":
                photo_url = photos_map[photo_city_name]["_embedded"]["ua:images"][
                    "photos"
                ][0]["image"]["web"]
                print(city_name + " " + photo_url)
                if city_name == "New York":
                    city_name = "New York City"
                city_map[city_name].image_url = photo_url
    session.commit()

    # Add photos to remaining cities
    image_urls_map = {
        "Fort Worth": "https://cdn.pixabay.com/photo/2016/08/13/15/28/fort-worth-1590922_960_720.jpg",
        "El Paso": "https://cdn.pixabay.com/photo/2013/06/09/13/06/el-paso-123727_960_720.jpg",
        "Tucson": "https://www.goodfreephotos.com/albums/united-states/arizona/tucson/cityscape-of-tucson-arizona.jpg",
        "Fresno": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Downtownfresnoskyline.jpg",
        "Mesa": "https://en.wikipedia.org/wiki/Mesa,_Arizona#/media/File:Downtown_Mesa_Arizona.jpg",
        "Sacramento": "https://upload.wikimedia.org/wikipedia/commons/4/40/Sacramento_Skyline_%28cropped%29.jpg",
        "Long Beach": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Long_Beach%2C_CA_at_night.jpg",
        "Virginia Beach": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Virginia_Beach_waterfront.jpg",
        "Oakland": "https://upload.wikimedia.org/wikipedia/commons/d/d5/OAKLAND%2C_CA%2C_USA_-_Skyline_and_Bridge.JPG",
        "Tulsa": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Downtown_Tulsa_Skyline.jpg",
        "Arlington": "https://upload.wikimedia.org/wikipedia/commons/6/64/Arlington_Texas_Entertainment_District.jpg",
    }
    for city in session.query(City).filter(City.image_url == None).all():
        print(city.name)
        city.image_url = image_urls_map[city.name]
    session.commit()
