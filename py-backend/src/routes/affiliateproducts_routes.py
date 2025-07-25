from fastapi import APIRouter, Query, Depends, Body, Response
from typing import Any
from collections.abc import Sequence
from uuid import UUID
from ..models.affliateproducts_model import Product
from ..dtos.ProductDto import ProductDto
from ..services.affiliateproducts_service import AffiliateProductsService
from ..utils.verify_jwt import get_current_user_details
from ..security.verify_admin import verify_api_key
from ..utils.api_response import ApiResponse


router = APIRouter()


@router.post("/add-products", dependencies=[Depends(verify_api_key)])
async def add_product_route(product: ProductDto) -> Response:
    db_product: Product = Product(**product.model_dump())

    res: ApiResponse = AffiliateProductsService.add_product(db_product)
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.get("/get-products")
async def get_products_route() -> Response:
    res: ApiResponse = AffiliateProductsService.get_products()
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.get("/get-product-by-name")
async def get_product_by_name_route(product_name: str) -> Response:
    res: ApiResponse = AffiliateProductsService.get_product_by_name(product_name)
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.patch("/update-product", dependencies=[Depends(verify_api_key)])
async def update_product_route(
    product_id: UUID = Query(...), fields_to_updates: dict[str, Any] = Body(...)
) -> Response:
    res: ApiResponse = AffiliateProductsService.update_product_fields(
        product_id, fields_to_updates
    )
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.delete("/delete-product")
async def delete_product_route(
    product_ids: list[UUID] = Query(...), _: str = Depends(verify_api_key)
):
    res = AffiliateProductsService.delete_products(product_ids)
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
