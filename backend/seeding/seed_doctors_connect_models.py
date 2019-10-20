import os
import random
import sys
import time
from collections import namedtuple
from pprint import pprint

import requests
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append("../")
from models import Specialty, City, Doctor

DoctorRelationship = namedtuple("DoctorRelationship", ["city", "doctor", "specialty"])


def build_doctor(doctor_item, city, doctor_relationship_list, specialties):
    name = (
        f'{doctor_item["profile"]["first_name"]} {doctor_item["profile"]["last_name"]}'
    )
    print(name + " " + city.name)
    doctor = Doctor(
        name=name,
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
    if "title" in doctor_item["profile"]:
        doctor.title = doctor_item["profile"]["title"]

    if len(doctor_item["specialties"]) > 0:
        spec_name = doctor_item["specialties"][0]["name"]
        specialty = specialties[spec_name]

        doctor_relationship_list.append(DoctorRelationship(city, doctor, specialty))
        return doctor
    else:
        return None


def connect_models(doctor_relationship_list, session):
    # Shuffles list of doctors so they aren't grouped by city in the database
    random.shuffle(doctor_relationship_list)
    print(len(doctor_relationship_list))
    for city, doctor, specialty in doctor_relationship_list:
        session.add(doctor)

        specialty.num_doctors = (
            specialty.num_doctors + 1 if city.num_doctors is not None else 1
        )

        doctor.specialty = specialty

        city.doctors.append(doctor)
        city.num_doctors = city.num_doctors + 1 if city.num_doctors is not None else 1
        city_specialties = set(spec.name for spec in city.specialties)
        if specialty.name not in city_specialties:
            city.num_specialties = (
                city.num_specialties + 1 if city.num_specialties is not None else 1
            )
            specialty.num_cities = (
                specialty.num_cities + 1 if specialty.num_cities is not None else 1
            )
            city.specialties.append(specialty)


if __name__ == "__main__":
    load_dotenv()

    DB_URI = os.getenv("DATABASE_URI")
    BETTER_DOCTOR_KEY = os.getenv("BETTER_DOCTOR_KEY")

    db = create_engine(DB_URI)

    Session = sessionmaker(db)
    session = Session()

    specialties = {
        specialty.name: specialty for specialty in session.query(Specialty).all()
    }

    cities = session.query(City).all()

    doctor_relationship_list = []

    for city in cities:
        # number of doctors per city to seed, currently random between 30 and 60
        limit = random.randint(30, 60)

        doctors_resp = requests.get(
            f"https://api.betterdoctor.com/2016-03-01/doctors?location={city.latitude},{city.longitude},20&limit={limit}&user_key={BETTER_DOCTOR_KEY}"
        ).json()
        doctors = doctors_resp["data"]
        for doctor_item in doctors:
            doctor = build_doctor(
                doctor_item, city, doctor_relationship_list, specialty
            )
            if doctor is None:
                print("Skipped because no specialty")

        time.sleep(1)

    connect_models(doctor_relationship_list, session)

    session.commit()
