import unittest

from seeding.seed_cities import build_city
from seeding.seed_specialties import build_specialty
from seeding.seed_doctors_connect_models import (
    build_doctor,
    connect_models,
    DoctorRelationship,
)
from seeding.doctor_item import doctor_item


class TestSeeding(unittest.TestCase):
    def test_build_city(self):
        city_name = "Austin"
        city = build_city(city_name)
        self.assertEqual(city.name, city_name)
        self.assertEqual(city.country, "United States of America")
        self.assertEqual(city.country_code, "US")
        self.assertEqual(city.elevation_meters, 149)
        self.assertEqual(city.latitude, 30.26715)
        self.assertEqual(city.longitude, -97.74306)
        self.assertEqual(city.population, 931830)
        self.assertEqual(city.region, "Texas")
        self.assertEqual(city.region_code, "TX")
        self.assertEqual(city.timezone, "America__Chicago")
        self.assertEqual(city.num_doctors, None)
        self.assertEqual(city.num_specialties, None)
        self.assertEqual(city.doctors, [])
        self.assertEqual(city.specialties, [])

    def test_build_specialty_does_not_exist(self):
        specialty_item = {
            "uid": "sport-physical-therapist",
            "name": "Sports Physical Therapy",
            "description": "Specializes in sport injury related physical therapy.",
            "category": "medical",
            "actor": "Sports Physical Therapist",
            "actors": "Sports Physical Therapists",
        }
        specialty = build_specialty(specialty_item, set())
        self.assertIsNotNone(specialty)
        self.assertEqual(specialty.name, specialty_item["name"])
        self.assertEqual(specialty.description, specialty_item["description"])
        self.assertEqual(specialty.category, specialty_item["category"])
        self.assertEqual(specialty.num_doctors, None)
        self.assertEqual(specialty.num_cities, None)

    def test_build_specialty_already_exists(self):
        specialty = build_specialty(
            {
                "uid": "sport-physical-therapist",
                "name": "Sports Physical Therapy",
                "description": "Specializes in sport injury related physical therapy.",
                "category": "medical",
                "actor": "Sports Physical Therapist",
                "actors": "Sports Physical Therapists",
            },
            {"Family Medicine", "Sports Physical Therapy"},
        )
        self.assertIsNone(specialty)

    def test_build_doctor(self):
        city = build_city("Austin")
        specialty = build_specialty(
            {
                "uid": "general-dentist",
                "name": "General Dentistry",
                "description": "Specializes in teeth and oral health.",
                "category": "dental",
                "actor": "Dentist",
                "actors": "Dentists",
            },
            set(),
        )
        specialties = {"General Dentistry": specialty}
        doctor_relationship_list = []

        doctor = build_doctor(doctor_item, city, doctor_relationship_list, specialties)

        self.assertIsNotNone(doctor)
        self.assertEqual(
            doctor.name,
            f'{doctor_item["profile"]["first_name"]} {doctor_item["profile"]["last_name"]}',
        )
        self.assertEqual(doctor.bio, doctor_item["profile"]["bio"])
        self.assertEqual(
            doctor.phone, doctor_item["practices"][0]["phones"][0]["number"]
        )
        self.assertEqual(
            doctor.street, doctor_item["practices"][0]["visit_address"]["street"]
        )
        self.assertEqual(
            doctor.zip_code, doctor_item["practices"][0]["visit_address"]["zip"]
        )
        self.assertEqual(
            doctor.address_city, doctor_item["practices"][0]["visit_address"]["city"]
        )
        self.assertEqual(
            doctor.state, doctor_item["practices"][0]["visit_address"]["state"]
        )
        self.assertEqual(
            doctor.latitude, doctor_item["practices"][0]["visit_address"]["lat"]
        )
        self.assertEqual(
            doctor.longitude, doctor_item["practices"][0]["visit_address"]["lon"]
        )
        self.assertEqual(doctor.image_url, doctor_item["profile"]["image_url"])
        self.assertEqual(
            doctor.insurance_plans,
            ", ".join(
                insurance["insurance_plan"]["name"]
                for insurance in doctor_item["insurances"]
            ),
        )
        self.assertEqual(doctor.rating, doctor_item["ratings"][0]["rating"])
        self.assertEqual(doctor.college, doctor_item["educations"][0]["school"])
        self.assertEqual(doctor.degree, doctor_item["educations"][0]["degree"])
        self.assertEqual(doctor.gender, doctor_item["profile"]["gender"])
        self.assertEqual(doctor.title, doctor_item["profile"]["title"])

        self.assertEqual(len(doctor_relationship_list), 1)
        self.assertEqual(doctor_relationship_list[0].city, city)
        self.assertEqual(doctor_relationship_list[0].doctor, doctor)
        self.assertEqual(doctor_relationship_list[0].specialty, specialty)

    def test_connect_models(self):
        session = set()  # Mocking session with set so session.add() won't fail

        city = build_city("Austin")
        specialty = build_specialty(
            {
                "uid": "general-dentist",
                "name": "General Dentistry",
                "description": "Specializes in teeth and oral health.",
                "category": "dental",
                "actor": "Dentist",
                "actors": "Dentists",
            },
            set(),
        )
        specialties = {"General Dentistry": specialty}
        doctor_relationship_list = []
        doctor = build_doctor(doctor_item, city, doctor_relationship_list, specialties)

        self.assertEqual(len(doctor_relationship_list), 1)
        self.assertEqual(doctor_relationship_list[0].city, city)
        self.assertEqual(doctor_relationship_list[0].doctor, doctor)
        self.assertEqual(doctor_relationship_list[0].specialty, specialty)

        connect_models(doctor_relationship_list, session)

        self.assertEqual(len(session), 1)
        self.assertIn(doctor, session)
        self.assertIs(doctor.specialty, specialty)
        self.assertEqual(len(city.doctors), 1)
        self.assertIn(doctor, city.doctors)
        self.assertEqual(city.num_doctors, 1)
        self.assertEqual(city.num_specialties, 1)
        self.assertEqual(specialty.num_cities, 1)
        self.assertIn(specialty, city.specialties)


if __name__ == "__main__":
    unittest.main()
