from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from app import (
    Product,
    add_product,
    get_products,
    create_db_and_tables,
    delete_product,
    update_product,
)


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
def on_startup():
    create_db_and_tables()


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


@app.put("/update-product/{product_id}")
async def update_product_route(product_id: int, product: Product):
    try:
        update_product(product_id, product)
        return {"message": "Product updated successfully"}
    except ValueError as e:
        return {"error": str(e)}


@app.delete("/delete-product/{product_id}")
async def delete_product_route(product_id: int):
    try:
        delete_product(product_id)
        return {"message": "Product deleted successfully"}
    except ValueError as e:
        return {"error": str(e)}


@app.get("/access-token")
def access_token(request: Request):
    access_token = request.cookies.get("accessToken")
    return {"access_token": access_token}
