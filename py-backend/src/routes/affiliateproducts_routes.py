# products_routes.py
from fastapi import APIRouter, Query, Depends, Body
from typing import List, Any, Dict
from uuid import UUID
from ..models.affliateproducts_model import Product, CartItem
from ..services.affiliateproducts_service import AffiliateProductsService
from ..utils.verify_jwttoken import get_current_user
from ..security.verify_admin import verify_api_key

router = APIRouter()


@router.post("/add-products")
async def add_product_route(product: Product, _: str = Depends(verify_api_key)):
    AffiliateProductsService.add_product(product)
    return {"message": "Product added to the database"}


@router.get("/get-products")
async def get_products_route():
    products: list[Product] = AffiliateProductsService.get_products()
    return products


@router.get("/get-product-by-name")
async def get_product_by_name_route(product_name: str):
    product: Product | None = AffiliateProductsService.get_product_by_name(product_name)
    if product:
        return product
    else:
        return {"error": "Product not found"}


@router.patch("/update-product")
async def update_product_route(
    product_id: UUID = Query(...),
    fields_to_updates: Dict[str, Any] = Body(...),
    _: str = Depends(verify_api_key),
):
    try:
        AffiliateProductsService.update_product_fields(product_id, fields_to_updates)
        return {"message": "Product updated successfully"}
    except ValueError as e:
        return {"error": str(e)}


@router.delete("/delete-product")
async def delete_product_route(
    product_ids: List[UUID] = Query(...), _: str = Depends(verify_api_key)
):
    try:
        AffiliateProductsService.delete_product(product_ids)
        return {"message": "Products deleted successfully"}
    except ValueError as e:
        return {"error": str(e)}


@router.post("/add-to-cart")
async def add_to_cart_route(
    data: CartItem, current_user: dict = Depends(get_current_user)
):
    try:
        user_id = current_user["user_id"]

        AffiliateProductsService.add_product_in_cart(user_id, data.product_id)
        return {"message": "Product added to cart successfully"}
    except ValueError as e:
        return {"error": str(e)}


@router.get("/get-cart-items")
async def get_cart_items_route(current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user["user_id"]
        cart_items: list[Product] = AffiliateProductsService.get_cart_items(user_id)
        return cart_items
    except ValueError as e:
        return {"error": str(e)}


@router.delete("/remove-from-cart")
async def remove_from_cart_route(
    data: CartItem, current_user: dict = Depends(get_current_user)
):
    try:
        user_id = current_user["user_id"]

        AffiliateProductsService.remove_product_from_cart(user_id, data.product_id)
        return {"message": "Product removed from cart successfully"}
    except ValueError as e:
        return {"error": str(e)}
