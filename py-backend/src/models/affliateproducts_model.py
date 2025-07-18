from typing import Any
from typing import Dict
from pydantic import field_validator, BaseModel
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, ARRAY, String, Text, UUID, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from typing import List, Optional
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
    subCategory: List[str] = Field(
        default_factory=list, sa_column=Column(ARRAY(String(100)))
    )
    description: str = Field(sa_column=Column(Text))
    tags: List[str] = Field(default_factory=list, sa_column=Column(ARRAY(String(50))))
    affiliateLinks: List[Dict[str, Any]] = Field(
        sa_column=Column(JSONB, nullable=False)
    )
    # cart_items: List["CartItem"] = Relationship(back_populates="product")

    # @field_validator("affiliateLinks", mode="before")
    # @classmethod
    # def validate_affiliate_links(cls, v):
    #     print(f"validate_affiliate_links: {v}")
    #     if not isinstance(v, list):
    #         raise ValueError("affiliateLinks must be a list")
    #     for item in v:
    #         if not isinstance(item, dict):
    #             raise ValueError("Each item in affiliateLinks must be a dictionary")
    #         if "platform" not in item:
    #             raise ValueError(
    #                 "Each affiliate link dictionary must contain a 'platform' key"
    #             )
    #         if not isinstance(item["platform"], str):
    #             raise ValueError(
    #                 "The 'platform' value in affiliate link must be a string"
    #             )
    #         if "link" not in item:
    #             raise ValueError(
    #                 "Each affiliate link dictionary must contain a 'link' key"
    #             )
    #         if not isinstance(item["link"], str):
    #             raise ValueError("The 'link' value in affiliate link must be a string")
    #     return v


class Cart(SQLModel, table=True):
    user_id: str = Field(max_length=255, primary_key=True, unique=True)
    product_ids: list[str] = Field(
        default_factory=list,
        sa_column=Column(ARRAY(UUID(as_uuid=False)), nullable=False),
    )
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    # product: Optional[Product] = Relationship(back_populates="cart_items")

    # @field_validator("affiliateLinks", mode="before")
    # @classmethod
    # def validate_affiliate_links(cls, v):
    #     if not isinstance(v, list):
    #         raise ValueError("affiliateLinks must be a list")
    #     for item in v:
    #         if not isinstance(item, dict):
    #             raise ValueError("Each item in affiliateLinks must be a dictionary")
    #         if "platform" not in item or "link" not in item:
    #             raise ValueError("Each affiliate link must have 'platform' and 'link'")
    #     return v
