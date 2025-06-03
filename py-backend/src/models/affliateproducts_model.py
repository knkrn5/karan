from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, ARRAY, String, Text
from typing import List, Optional
from datetime import datetime, timezone


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255, unique=True)
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

    cart_items: List["CartItem"] = Relationship(back_populates="product")


class CartItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    product_id: int = Field(foreign_key="product.id")
    added_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    product: Optional[Product] = Relationship(back_populates="cart_items")
