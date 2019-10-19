import os
import sys
import time
from pprint import pprint

import requests
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append("../")
from models import Specialty, City, Doctor

load_dotenv()

DB_URI = os.getenv("DATABASE_URI")
BETTER_DOCTOR_KEY = os.getenv("BETTER_DOCTOR_KEY")

db = create_engine(DB_URI)

Session = sessionmaker(db)
session = Session()

specialties = {
    specialty.name: specialty for specialty in session.query(Specialty).all()
}

# Change this to seed new cities and doctors
cities = ["Austin"]

for city in cities:
    cities_resp = requests.get(
        "http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=" + city
    ).json()
    city_resp = requests.get(
        "http://geodb-free-service.wirefreethought.com/v1/geo/cities/"
        + str(cities_resp["data"][0]["id"])
    ).json()
    pprint(city_resp)
    data = city_resp["data"]
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
        num_doctors=0,
        num_specialties=0,
    )
    session.add(city)

    # number of doctors per city to seed, currently 50
    limit = 50

    doctors_resp = requests.get(
        f"https://api.betterdoctor.com/2016-03-01/doctors?location={data['latitude']},{data['longitude']},50&limit={limit}&user_key={BETTER_DOCTOR_KEY}"
    ).json()
    doctors = doctors_resp["data"]
    for doctor_item in doctors:
        name = f'{doctor_item["profile"]["first_name"]} {doctor_item["profile"]["last_name"]}'
        print(name)
        doctor = Doctor(
            name=name,
            title=doctor_item["profile"]["title"],
            bio=doctor_item["profile"]["bio"],
            phone=doctor_item["practices"][0]["phones"][0]["number"],
            street=doctor_item["practices"][0]["visit_address"]["street"],
            zip_code=doctor_item["practices"][0]["visit_address"]["zip"],
            address_city=doctor_item["practices"][0]["visit_address"]["city"],
            state=doctor_item["practices"][0]["visit_address"]["state"],
            latitude=doctor_item["practices"][0]["visit_address"]["lat"],
            longitude=doctor_item["practices"][0]["visit_address"]["lon"],
            image_url=doctor_item["profile"]["image_url"],
            insurance_plans=", ".join(
                insurance["insurance_plan"]["name"]
                for insurance in doctor_item["insurances"]
            ),
        )
        if len(doctor_item["ratings"]) > 0 and "rating" in doctor_item["ratings"][0]:
            doctor.rating = doctor_item["ratings"][0]["rating"]
        if len(doctor_item["educations"]) > 0:
            if "school" in doctor_item["educations"][0]:
                doctor.college = doctor_item["educations"][0]["school"]
            if "degree" in doctor_item["educations"][0]:
                doctor.degree = doctor_item["educations"][0]["degree"]
        if "gender" in doctor_item["profile"]:
            doctor.gender = doctor_item["profile"]["gender"]
        session.add(doctor)

        spec_name = doctor_item["specialties"][0]["name"]
        specialty = specialties[spec_name]
        specialty.num_doctors += 1

        doctor.specialty = specialty

        city.doctors.append(doctor)
        city.num_doctors += 1
        city_specialties = set(spec.name for spec in city.specialties)
        if spec_name not in city_specialties:
            city.num_specialties += 1
            specialty.num_cities += 1
            city.specialties.append(specialty)

    time.sleep(1)
session.commit()
