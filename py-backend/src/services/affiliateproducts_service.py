from sqlmodel import create_engine, Session, select
from sqlalchemy import func
from typing import List, Optional, Any, Dict
from src.models.affliateproducts_model import Product, CartItem
from src.db.postgresDb import DATABASE_URL


engine = create_engine(DATABASE_URL)


def add_product(product: Product):
    if not isinstance(product, Product):
        raise ValueError("The product must be an instance of the Product class.")

    with Session(engine) as session:
        session.add(product)
        session.commit()
        print("✅ Product added to the database.")


def get_products() -> List[Product]:
    with Session(engine) as session:
        return session.query(Product).all()


def get_product_by_name(product_name: str) -> Optional[Product]:
    with Session(engine) as session:
        return (
            session.query(Product)
            .filter(func.lower(Product.name).ilike(f"%{product_name.strip().lower()}%"))
            .all()
        )


def update_product_fields(product_id: int, fields_to_updates: Dict[str, Any]):
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise ValueError("Product not found.")

        for field_key, field_value in fields_to_updates.items():
            if hasattr(product, field_key):
                setattr(product, field_key, field_value)
            else:
                raise ValueError(f"Product does not have the attribute '{field_key}'.")

        session.add(product)
        session.commit()
        print("✅ Product updated in the database.")


def delete_product(product_ids: list[int]):
    with Session(engine) as session:
        for id in product_ids:
            if not isinstance(id, int):
                raise ValueError("Product ID must be an integer.")
            product = session.get(Product, id)
            if not product:
                print(f"⚠️ Product with ID {id} not found.")
                continue
            session.delete(product)

        session.commit()
        print("✅ Products deleted from the database.")


def add_product_in_cart(user_id: int, product_id: int):
    with Session(engine) as session:
        product = session.get(Product, product_id)
        if not product:
            raise ValueError("Product not found.")

        # Checking if product already in user's cart
        cart_item = session.exec(
            select(CartItem)
            .where(CartItem.user_id == user_id)
            .where(CartItem.product_id == product_id)
        ).first()

        if cart_item:
            print("Product already in cart.")
        else:
            cart_item = CartItem(user_id=user_id, product_id=product_id)
            session.add(cart_item)
            session.commit()
            print("✅ Product added to cart.")


def get_cart_items(user_id: int) -> List[CartItem]:
    with Session(engine) as session:
        cart_items = session.exec(
            select(CartItem).where(CartItem.user_id == user_id)
        ).all()
        return cart_items
