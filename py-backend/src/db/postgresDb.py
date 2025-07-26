from sqlmodel import SQLModel, create_engine
from sqlalchemy.exc import OperationalError, DatabaseError
import os


DATABASE_URL = os.getenv("POSTGRES_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL environment variable is not set.")
engine = create_engine(DATABASE_URL)


def connect_db_and_create_table() -> str:
    try:
        SQLModel.metadata.create_all(engine)
        return "✅ Database connected and tables created."
    except OperationalError as e:
        return f"❌ Failed to connect to the database: {e}"
    except DatabaseError as e:
        return f"❌ Database error occurred: {e}"
    except Exception as e:
        return f"❌ An unexpected error occurred: {e}"