from fastapi import APIRouter, Query, Depends, Body, Response
from typing import Any
from uuid import UUID
from ...models.affliateproducts_model import Product
from ...dtos.ProductDto import ProductDto
from ...services.admin_services.adminAffiliateproducts_service import (
    AdminAffiliateProductsService,
)
from ...security.verify_admin import verify_api_key
from ...utils.api_response import ApiResponse


router = APIRouter()


@router.post("/add-products", dependencies=[Depends(verify_api_key)])
async def add_product_route(product: ProductDto) -> Response:
    db_product: Product = Product(**product.model_dump())

    res: ApiResponse = AdminAffiliateProductsService.add_product(db_product)
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.get("/get-product-by-name")
async def get_product_by_name_route(product_name: str) -> Response:
    res: ApiResponse = AdminAffiliateProductsService.get_product_by_name(product_name)
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )


@router.patch("/update-product", dependencies=[Depends(verify_api_key)])
async def update_product_route(
    product_id: UUID = Query(...), fields_to_updates: dict[str, Any] = Body(...)
) -> Response:
    res: ApiResponse = AdminAffiliateProductsService.update_product_fields(
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
    res = AdminAffiliateProductsService.delete_products(product_ids)
    return Response(
        content=res.model_dump_json(),
        status_code=res.status_code,
        media_type="application/json",
    )
