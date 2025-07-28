from pydantic import BaseModel


class AffiliateLink(BaseModel):
    platform: str
    link: str
    price: float


class ProductDto(BaseModel):
    name: str
    image: str
    category: str
    brand: str
    subCategory: list[str]
    description: str
    tags: list[str]
    affiliateLinks: list[AffiliateLink]
