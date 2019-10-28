from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

city_specialty = db.Table(
    "cityspecialty",
    db.Column("city_id", db.Integer, db.ForeignKey("city.id")),
    db.Column("specialty_id", db.Integer, db.ForeignKey("specialty.id")),
)


class City(db.Model):
    __tablename__ = "city"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    country = db.Column(db.Unicode)
    country_code = db.Column(db.Unicode)
    elevation_meters = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    population = db.Column(db.Integer)
    region = db.Column(db.Unicode)
    region_code = db.Column(db.Unicode)
    timezone = db.Column(db.Unicode)
    num_doctors = db.Column(db.Integer, default=0)
    doctors = db.relationship("Doctor", backref="city")
    num_specialties = db.Column(db.Integer, default=0)
    specialties = db.relationship(
        "Specialty", secondary=city_specialty, backref="cities"
    )
    image_url = db.Column(db.Unicode)

    def __repr__(self):
        return f"{name}, {region_code}"


class Doctor(db.Model):
    __tablename__ = "doctor"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    title = db.Column(db.Unicode)
    bio = db.Column(db.Unicode)
    gender = db.Column(db.Unicode)
    rating = db.Column(db.Float)
    phone = db.Column(db.Unicode)
    street = db.Column(db.Unicode)
    zip_code = db.Column(db.Integer)
    address_city = db.Column(db.Unicode)
    state = db.Column(db.Unicode)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    image_url = db.Column(db.Unicode)
    college = db.Column(db.Unicode)
    degree = db.Column(db.Unicode)
    insurance_plans = db.Column(db.Unicode)
    city_id = db.Column(db.Integer, db.ForeignKey("city.id"))
    specialty_id = db.Column(db.Integer, db.ForeignKey("specialty.id"))
    specialty = db.relationship("Specialty", backref="doctors")

    def __repr__(self):
        return f"{name}, {title}"


class Specialty(db.Model):
    __tablename__ = "specialty"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    description = db.Column(db.Unicode)
    category = db.Column(db.Unicode)
    num_doctors = db.Column(db.Integer, default=0)
    num_cities = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"{self.name} - {self.category}"
