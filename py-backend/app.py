from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv
import os
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, ARRAY, String
from typing import List, Optional


load_dotenv()


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    image: str
    category: str
    subCategory: str
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


# def add_products():
#     products = [
#         Product(
#             name="Product 1",
#             image="https://picsum.photos/200/300",
#             category="electronics",
#             subCategory="gadgets",
#             description="This is a test product 1",
#             tags=["electronics", "gadgets"],
#             price=10.99,
#             affiliateLink="https://example.com/product1",
#         ),
#         Product(
#             name="Product 2",
#             image="https://picsum.photos/200/301",
#             category="fashion",
#             subCategory="clothing",
#             description="This is a test product 2",
#             tags=["fashion", "clothing"],
#             price=29.99,
#             affiliateLink="https://example.com/product2",
#         ),
#         Product(
#             name="Product 3",
#             image="https://picsum.photos/200/302",
#             category="books",
#             subCategory="education",
#             description="This is a test product 3",
#             tags=["books", "education"],
#             price=15.50,
#             affiliateLink="https://example.com/product3",
#         ),
#         Product(
#             name="Product 4",
#             image="https://picsum.photos/200/303",
#             category="home",
#             subCategory="kitchen",
#             description="This is a test product 4",
#             tags=["home", "kitchen"],
#             price=45.00,
#             affiliateLink="https://example.com/product4",
#         ),
#         Product(
#             name="Product 5",
#             image="https://picsum.photos/200/304",
#             category="sports",
#             subCategory="outdoor",
#             description="This is a test product 5",
#             tags=["sports", "outdoor"],
#             price=75.25,
#             affiliateLink="https://example.com/product5",
#         ),
#     ]

#     with Session(engine) as session:
#         session.add_all(products)
#         session.commit()
#         print("✅ Products added to the database.")


def add_products(
    name: str,
    image: str,
    category: str,
    subCategory: str,
    description: str,
    tags: List[str],
    price: float,
    affiliateLink: str,
):
    product = Product(
        name=name,
        image=image,
        category=category,
        subCategory=subCategory,
        description=description,
        tags=tags,
        price=price,
        affiliateLink=affiliateLink,
    )

    with Session(engine) as session:
        session.add(product)
        session.commit()
        print("✅ Product added to the database.")


def get_products():
    with Session(engine) as session:
        products = session.query(Product).all()
        return products
