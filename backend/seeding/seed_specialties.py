import os
import sys
from pprint import pprint

import requests
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append("../")
from models import Specialty

load_dotenv()

DB_URI = os.getenv("DATABASE_URI")
BETTER_DOCTOR_KEY = os.getenv("BETTER_DOCTOR_KEY")

db = create_engine(DB_URI)

Session = sessionmaker(db)
session = Session()

specialties = requests.get(
    f"https://api.betterdoctor.com/2016-03-01/specialties?&user_key={BETTER_DOCTOR_KEY}"
).json()
pprint(specialties)
names = set()
for specialty_item in specialties["data"]:
    name = specialty_item["name"]
    if name not in names:
        print(specialty_item["name"])
        names.add(name)
        specialty = Specialty(
            name=specialty_item["name"],
            description=specialty_item["description"],
            category=specialty_item["category"],
        )
    session.add(specialty)
session.commit()
