from sqlmodel import SQLModel, Field, create_engine, Session
from sqlalchemy.exc import OperationalError
from sqlalchemy import Column, ARRAY, String
from dotenv import load_dotenv
from typing import List, Optional
import os

load_dotenv()


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    image: str
    category: str
    brand: str
    subCategory: List[str] = Field(sa_column=Column(ARRAY(String)))
    description: str
    tags: List[str] = Field(sa_column=Column(ARRAY(String)))
    price: float
    affiliateLink: str


engine = create_engine(os.getenv("POSTGRES_URL"))


def create_db_and_tables():
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


def get_products() -> List[Product]:
    with Session(engine) as session:
        return session.query(Product).all()


def update_product(product_id: int, updated_product: Product):
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise ValueError("Product not found.")

        for key, value in updated_product.dict(exclude_unset=True).items():
            setattr(product, key, value)

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
