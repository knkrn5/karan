from sys import exception
from starlette.exceptions import HTTPException
from fastapi import APIRouter, Query, Depends, Body
from typing import Any
from collections.abc import Sequence
from uuid import UUID
from ..models.affliateproducts_model import Product
from ..dtos.ProductDto import ProductDto
from ..services.affiliateproducts_service import AffiliateProductsService
from ..utils.verify_jwt import get_current_user_details
from ..security.verify_admin import verify_api_key

router = APIRouter()


@router.post("/add-products", dependencies=[Depends(verify_api_key)])
async def add_product_route(product: ProductDto) -> str:
    db_product: Product = Product(**product.model_dump())
    try:
        res = AffiliateProductsService.add_product(db_product)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-products")
async def get_products_route() -> Sequence[Product]:
    try:
        products: Sequence[Product] = AffiliateProductsService.get_products()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-product-by-name")
async def get_product_by_name_route(product_name: str) -> Sequence[Product]:
    try:
        res: Sequence[Product] = AffiliateProductsService.get_product_by_name(
            product_name
        )
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/update-product", dependencies=[Depends(verify_api_key)])
async def update_product_route(
    product_id: UUID = Query(...), fields_to_updates: dict[str, Any] = Body(...)
):
    try:
        res = AffiliateProductsService.update_product_fields(
            product_id, fields_to_updates
        )
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete-product")
async def delete_product_route(
    product_ids: list[UUID] = Query(...), _: str = Depends(verify_api_key)
):
    try:
        AffiliateProductsService.delete_products(product_ids)
        return {"message": "Products deleted successfully"}
    except ValueError as e:
        return {"error": str(e)}


@router.post("/add-remove-from-cart")
async def add_remove_product_from_cart_route(
    product_id: str = Body(embed=True),
    current_user: dict[str, Any] = Depends(get_current_user_details),
):
    try:
        user_id = current_user["user_id"]

        res = AffiliateProductsService.add_remove_product_from_cart(user_id, product_id)
        return res
    except ValueError as e:
        return {"error": str(e)}


@router.get("/get-cart-items")
async def get_cart_items_route(
    current_user: dict[str, Any] = Depends(get_current_user_details),
):
    try:
        user_id = current_user["user_id"]
        cart_items: Sequence[Product] = AffiliateProductsService.get_cart_items(user_id)
        return cart_items
    except ValueError as e:
        return {"error": str(e)}


# @router.delete("/remove-from-cart")
# async def remove_from_cart_route(
#     data: Cart, current_user: dict = Depends(get_current_user_details)
# ):
#     try:
#         user_id = current_user["user_id"]

#         AffiliateProductsService.remove_product_from_cart(user_id, data.product_id)
#         return {"message": "Product removed from cart successfully"}
#     except ValueError as e:
#         return {"error": str(e)}
