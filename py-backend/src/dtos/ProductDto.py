from pydantic import BaseModel, HttpUrl


class AffiliateLink(BaseModel):
    platform: str
    link: str
    price: float


class ProductDto(BaseModel):
    name: str
    image: HttpUrl
    category: str
    brand: str
    subCategory: list[str]
    description: str
    tags: list[str]
    affiliateLinks: list[AffiliateLink]
