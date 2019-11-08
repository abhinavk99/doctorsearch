import pprint
import sys

sys.path.append("../../")
from models import db, City, Doctor, Specialty
from main import application

import requests
from sqlalchemy import func

with application.app_context():
    # Get doctors whose name appear more than once
    sub = (
        Doctor.query.with_entities(Doctor.name, func.count("*"))
        .group_by(Doctor.name)
        .having(func.count() > 1)
        .subquery()
    )
    # Query all the doctors whose name appear more than once
    duplicate_doctors = (
        Doctor.query.join(sub, Doctor.name == sub.c.name)
        .order_by(Doctor.name.asc())
        .all()
    )
    print("Number of duplicate doctors list", len(duplicate_doctors))
    # Map doctor name to list of instances in DB
    doctor_map = {}
    # Map doctor name to address city
    address_map = {}
    for doctor in duplicate_doctors:
        if doctor.name in doctor_map:
            doctor_map[doctor.name].append((doctor, doctor.city, doctor.specialty))
        else:
            doctor_map[doctor.name] = [(doctor, doctor.city, doctor.specialty)]

        if doctor.name not in address_map:
            address_map[doctor.name] = f"{doctor.address_city}, {doctor.state}"
    # pprint.pprint(doctor_map)
    pprint.pprint(address_map)
    assert len(doctor_map) == len(address_map)
    print("Number of duplicate doctors", len(doctor_map))

    for doctor_name, doctors in doctor_map.items():
        print(doctor_name)
        loc = address_map[doctor_name]
        min_dist = 10000000
        min_city_id = None
        for _, city, _ in doctors:
            dist_resp = requests.get(
                f"https://www.distance24.org/route.json?stops={loc}|{city.name}, {city.region_code}"
            ).json()
            dist = dist_resp["distance"]
            print(loc, f"{city.name}, {city.region_code}", dist)
            if dist < min_dist:
                min_dist = dist
                min_city_id = city.id
        print(min_dist, min_city_id)
        for doctor, city, specialty in doctors:
            if min_city_id != city.id:
                city.num_doctors -= 1
                specialty.num_doctors -= 1
                db.session.delete(doctor)
    db.session.commit()
