from sqlalchemy import Table, Column, Integer, Unicode, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship

Base = declarative_base()

city_specialty = Table(
    "cityspecialty",
    Base.metadata,
    Column("city_id", Integer, ForeignKey("city.id")),
    Column("specialty_id", Integer, ForeignKey("specialty.id")),
)


class City(Base):
    __tablename__ = "city"
    id = Column(Integer, primary_key=True)
    name = Column(Unicode, unique=True)
    country = Column(Unicode)
    country_code = Column(Unicode)
    elevation_meters = Column(Integer)
    latitude = Column(Float)
    longitude = Column(Float)
    population = Column(Integer)
    region = Column(Unicode)
    region_code = Column(Unicode)
    timezone = Column(Unicode)
    num_doctors = Column(Integer, default=0)
    doctors = relationship("Doctor", backref="city")
    num_specialties = Column(Integer, default=0)
    specialties = relationship("Specialty", secondary=city_specialty, backref="cities")

    def __repr__(self):
        return f"{name}, {region_code}"


class Doctor(Base):
    __tablename__ = "doctor"
    id = Column(Integer, primary_key=True)
    name = Column(Unicode)
    title = Column(Unicode)
    bio = Column(Unicode)
    gender = Column(Unicode)
    rating = Column(Float)
    phone = Column(Unicode)
    street = Column(Unicode)
    zip_code = Column(Integer)
    address_city = Column(Unicode)
    state = Column(Unicode)
    latitude = Column(Float)
    longitude = Column(Float)
    image_url = Column(Unicode)
    college = Column(Unicode)
    degree = Column(Unicode)
    insurance_plans = Column(Unicode)
    city_id = Column(Integer, ForeignKey("city.id"))
    specialty_id = Column(Integer, ForeignKey("specialty.id"))
    specialty = relationship("Specialty", backref="doctors")

    def __repr__(self):
        return f"{name}, {title}"


class Specialty(Base):
    __tablename__ = "specialty"
    id = Column(Integer, primary_key=True)
    name = Column(Unicode, unique=True)
    description = Column(Unicode)
    category = Column(Unicode)
    num_doctors = Column(Integer, default=0)
    num_cities = Column(Integer, default=0)

    def __repr__(self):
        return f"{self.name} - {self.category}"
