from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from app import (
    Product,
    add_product,
    get_products,
    connect_db_and_create_table,
    delete_product,
    update_product,
)
from typing import List


app = FastAPI(
    # docs_url=None,
    # redoc_url=None,
    # openapi_url=None,
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    connect_db_and_create_table()


@app.get("/")
async def main():
    return {"message": "Hello World"}


@app.post("/add-products")
async def add_product_route(product: Product):
    try:
        add_product(product)
        return {"message": "Product added to the database"}
    except ValueError as e:
        return {"error": str(e)}


@app.get("/get-products")
async def get_products_route():
    products = get_products()
    return products


@app.patch("/update-product/{product_id}")
async def update_product_route(product_id: int, product: Product):
    try:
        update_product(product_id, product)
        return {"message": "Product updated successfully"}
    except ValueError as e:
        return {"error": str(e)}


@app.delete("/delete-product")
async def delete_product_route(ids: List[int] = Query(...)):
    try:
        delete_product(ids)
        return {"message": "Products deleted successfully"}
    except ValueError as e:
        return {"error": str(e)}


@app.get("/access-token")
def access_token(request: Request):
    access_token = request.cookies.get("accessToken")
    return {"access_token": access_token}
