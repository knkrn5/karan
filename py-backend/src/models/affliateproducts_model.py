from typing import Any
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, ARRAY, String, Text, UUID, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime, timezone
import uuid


class Product(SQLModel, table=True):
    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        sa_column=Column(UUID(as_uuid=False), primary_key=True, unique=True),
    )
    name: str = Field(sa_column=Column(String(255), unique=True))
    image: str = Field(max_length=1000)
    category: str = Field(max_length=100)
    brand: str = Field(max_length=100)
    subCategory: list[str] = Field(
        default_factory=list, sa_column=Column(ARRAY(String(100)))
    )
    description: str = Field(sa_column=Column(Text))
    tags: list[str] = Field(default_factory=list, sa_column=Column(ARRAY(String(50))))
    affiliateLinks: list[dict[str, object]] = Field(
        sa_column=Column(JSONB, nullable=False)
    )
    # cart_items: List["CartItem"] = Relationship(back_populates="product")


class Cart(SQLModel, table=True):
    user_id: str = Field(max_length=255, primary_key=True, unique=True)
    product_ids: list[str] = Field(
        default_factory=list,
        sa_column=Column(ARRAY(UUID(as_uuid=False)), nullable=False),
    )
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    # product: Optional[Product] = Relationship(back_populates="cart_items")
