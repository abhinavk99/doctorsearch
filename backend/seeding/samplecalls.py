import os
import requests
from pprint import pprint

from dotenv import load_dotenv

load_dotenv()

BETTER_DOCTOR_KEY = os.getenv("BETTER_DOCTOR_KEY")

# r = requests.get("http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=Austin")
r = requests.get(
    "http://geodb-free-service.wirefreethought.com/v1/geo/cities/118913"
).json()
pprint(r)

limit = 2
doctors = requests.get(
    f"https://api.betterdoctor.com/2016-03-01/doctors?location={r['data']['latitude']},{r['data']['longitude']},50&limit={limit}&user_key={BETTER_DOCTOR_KEY}"
).json()
pprint(doctors)

# specialties = requests.get(
#     f"https://api.betterdoctor.com/2016-03-01/specialties?limit=3&user_key={BETTER_DOCTOR_KEY}"
# ).json()
# pprint(specialties)
