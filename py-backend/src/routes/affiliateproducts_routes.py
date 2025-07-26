from fastapi import APIRouter, Query, Depends, Body, Response
from typing import Any
from collections.abc import Sequence
from ..services.affiliateproducts_service import AffiliateProductsService
from ..utils.verify_jwt import get_current_user_details
from ..utils.api_response import ApiResponse


router = APIRouter()


@router.get("/get-products")
async def get_products_route() -> Response:
    res: ApiResponse = AffiliateProductsService.get_products()
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.get("/get-cart-items")
async def get_cart_items_route(
    current_user: dict[str, Any] = Depends(get_current_user_details),
):
    user_id = current_user["user_id"]
    res = AffiliateProductsService.get_cart_items(user_id)
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.post("/add-remove-from-cart")
async def add_remove_product_from_cart_route(
    product_id: str = Body(embed=True),
    current_user: dict[str, Any] = Depends(get_current_user_details),
):
    user_id = current_user["user_id"]

    res = AffiliateProductsService.add_remove_product_from_cart(user_id, product_id)
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )
