import os
import sys

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append("../")
from models import City, Specialty, Doctor, Base

load_dotenv()

DB_URI = os.getenv("DATABASE_URI")

db = create_engine(DB_URI)

Session = sessionmaker(db)
session = Session()

Base.metadata.create_all(db)
