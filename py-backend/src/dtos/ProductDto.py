from pydantic import BaseModel
from typing import List, Dict, Any


class AffiliateLink(BaseModel):
    platform: str
    link: str
    price: float


class ProductDto(BaseModel):
    name: str
    image: str
    category: str
    brand: str
    subCategory: List[str]
    description: str
    tags: List[str]
    affiliateLinks: List[AffiliateLink]
