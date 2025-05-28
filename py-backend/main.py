from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    from app import create_db_and_tables

    create_db_and_tables()


@app.get("/")
async def main():
    return {"message": "Hello World"}


@app.post("/add-products")
async def add_products():
    from app import add_products

    add_products()
    return {"message": "Products added to the database"}


@app.get("/get-products")
async def get_products():
    from app import get_products

    products = get_products()
    return products
