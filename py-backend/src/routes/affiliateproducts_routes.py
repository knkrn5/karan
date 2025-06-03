# products_routes.py
from fastapi import Request, APIRouter, Query
from typing import List, Any, Dict
from src.models.affliateproducts_model import Product, CartItem
from src.services.affiliateproducts_service import (
    add_product,
    get_products,
    get_product_by_name,
    delete_product,
    update_product_fields,
    add_product_in_cart,
)

router = APIRouter()


@router.post("/add-products")
async def add_product_route(product: Product):
    try:
        add_product(product)
        return {"message": "Product added to the database"}
    except ValueError as e:
        return {"error": str(e)}


@router.get("/get-products")
async def get_products_route():
    products = get_products()
    return products


@router.get("/get-product-by-name")
async def get_product_by_name_route(product_name: str):
    product = get_product_by_name(product_name)
    if product:
        return product
    else:
        return {"error": "Product not found"}


@router.patch("/update-product/{product_id}")
async def update_product_route(product_id: int, fields_to_updates: Dict[str, Any]):
    try:
        update_product_fields(product_id, fields_to_updates)
        return {"message": "Product updated successfully"}
    except ValueError as e:
        return {"error": str(e)}


@router.delete("/delete-product")
async def delete_product_route(ids: List[int] = Query(...)):
    try:
        delete_product(ids)
        return {"message": "Products deleted successfully"}
    except ValueError as e:
        return {"error": str(e)}


@router.post("/add-to-cart")
async def add_to_cart_route(data: CartItem, request: Request):
    try:
        print(f"Request origin: {request.headers.get('origin')}")
        print(f"All cookies received: {dict(request.cookies)}")
        print(f"Cookie header: {request.headers.get('cookie')}")
        access_token = request.cookies.get("accessToken")
        if not access_token:
            return {"error": "Access token is required"}
        print(f"Access Token: {access_token}")
        add_product_in_cart(data.user_id, data.product_id)
        return {"message": "Product added to cart successfully"}
    except ValueError as e:
        return {"error": str(e)}
