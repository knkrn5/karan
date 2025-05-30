from sqlmodel import SQLModel, Field, create_engine, Session
from sqlalchemy.exc import OperationalError
from sqlalchemy import Column, ARRAY, String, Text
from dotenv import load_dotenv
from typing import List, Optional, Any
import os

load_dotenv()


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255)
    image: str = Field(max_length=1000)
    category: str = Field(max_length=100)
    brand: str = Field(max_length=100)
    subCategory: List[str] = Field(
        default_factory=list, sa_column=Column(ARRAY(String(100)))
    )
    description: str = Field(sa_column=Column(Text))
    tags: List[str] = Field(default_factory=list, sa_column=Column(ARRAY(String(50))))
    price: float = Field(gt=0)
    affiliateLink: str = Field(max_length=1000)


engine = create_engine(os.getenv("POSTGRES_URL"))


def connect_db_and_create_table():
    try:
        SQLModel.metadata.create_all(engine)
        print("✅ Database connected and tables created.")
    except OperationalError as e:
        print("❌ Failed to connect to the database.")
        print("Error:", e)


def add_product(product: Product):
    if not isinstance(product, Product):
        raise ValueError("The product must be an instance of the Product class.")

    with Session(engine) as session:
        session.add(product)
        session.commit()
        print("✅ Product added to the database.")


def get_all_products() -> List[Product]:
    with Session(engine) as session:
        return session.query(Product).all()


def update_product_field(product_id: int, field_key: str, field_value: Any):
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise ValueError("Product not found.")

        if hasattr(product, field_key):
            setattr(product, field_key, field_value)
        else:
            raise ValueError(f"Product does not have the attribute '{field_key}'.")

        session.add(product)
        session.commit()
        print("✅ Product updated in the database.")


def delete_product(product_ids: list[int]):
    with Session(engine) as session:
        for id in product_ids:
            if not isinstance(id, int):
                raise ValueError("Product ID must be an integer.")
            product = session.get(Product, id)
            if not product:
                print(f"⚠️ Product with ID {id} not found.")
                continue
            session.delete(product)

        session.commit()
        print("✅ Products deleted from the database.")
