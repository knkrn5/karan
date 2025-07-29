from pydantic import BaseModel


class AffiliateInfo(BaseModel):
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
    affiliateDetails: list[AffiliateInfo]
