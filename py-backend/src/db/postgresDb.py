from sqlmodel import SQLModel, create_engine
from sqlalchemy.exc import OperationalError
from src.models.affliateproducts_model import Product
import os

DATABASE_URL = os.getenv("POSTGRES_URL")
engine = create_engine(DATABASE_URL)


def connect_db_and_create_table():
    try:
        SQLModel.metadata.create_all(engine)
        print("✅ Database connected and tables created.")
    except OperationalError as e:
        print("❌ Failed to connect to the database.")
        print("Error:", e)
