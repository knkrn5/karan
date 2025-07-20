from sqlmodel import create_engine, Session, select
from sqlalchemy import func
from uuid import UUID
from typing import Any
from collections.abc import Sequence
from ..models.affliateproducts_model import Product, Cart
from datetime import datetime, timezone
from ..db.postgresDb import DATABASE_URL


# Ensure DATABASE_URL is a string
engine = create_engine(str(DATABASE_URL))


class AffiliateProductsService:
    @staticmethod
    def add_product(product: Product) -> None:
        with Session(engine) as session:
            session.add(product)
            session.commit()
            print("✅ Product added to the database.")

    @staticmethod
    def get_products() -> Sequence[Product]:
        with Session(engine) as session:
            return session.exec(select(Product)).all()

    @staticmethod
    def get_product_by_name(product_name: str) -> Sequence[Product]:
        with Session(engine) as session:
            return session.exec(
                select(Product).where(
                    func.lower(Product.name).ilike(f"%{product_name.strip().lower()}%")
                )
            ).all()

    @staticmethod
    def update_product_fields(
        product_id: UUID, fields_to_updates: dict[str, Any]
    ) -> None:
        with Session(engine) as session:
            product = session.get(Product, product_id)
            if not product:
                raise ValueError("Product not found.")

            for field_key, field_value in fields_to_updates.items():
                if hasattr(product, field_key):
                    setattr(product, field_key, field_value)
                else:
                    raise ValueError(
                        f"Product does not have the attribute '{field_key}'."
                    )

            session.add(product)
            session.commit()
            print("✅ Product updated in the database.")

    @staticmethod
    def delete_products(product_ids: list[UUID]) -> None:
        product_ids_str = [str(id) for id in product_ids]

        with Session(engine) as session:
            # Step 1: Remove product IDs from all affected carts
            carts_with_products = session.exec(
                select(Cart).where(Cart.product_ids.op("&&")(product_ids_str))  # pyright: ignore[reportAttributeAccessIssue]
            ).all()

            for cart in carts_with_products:
                cart.product_ids = [
                    pid for pid in cart.product_ids if pid not in product_ids_str
                ]
                cart.updated_at = datetime.now(timezone.utc)
                session.add(cart)

            # Step 2: Delete products themselves
            for id in product_ids:
                product = session.get(Product, id)
                if product:
                    session.delete(product)

            session.commit()
            print("✅ Products deleted and removed from all carts.")

    @staticmethod
    def get_cart_items(user_id: int) -> Sequence[Product]:
        with Session(engine) as session:
            user_cart: Cart | None = session.get(Cart, user_id)

            if not user_cart:
                return []

            product_ids: list[str] = user_cart.product_ids

            if not product_ids:
                return []

            # Fetch the products using the product IDs
            products_in_cart: Sequence[Product] = session.exec(
                select(Product).where(Product.id.in_(product_ids))  # pyright: ignore[reportAttributeAccessIssue]
            ).all()

            print(f"✅ Fetched {len(products_in_cart)} products from the cart.")

            return products_in_cart

    @staticmethod
    def add_remove_product_from_cart(user_id: str, product_id: str):
        with Session(engine) as session:
            # Validate product exists
            product = session.get(Product, product_id)
            if not product:
                raise ValueError("Product not found.")

            # Fetch user's cart (single row per user)
            user_cart = session.get(Cart, user_id)

            if user_cart:
                if product_id in user_cart.product_ids:
                    user_cart.product_ids = [
                        pid for pid in user_cart.product_ids if pid != product_id
                    ]
                    cart_action_status = "✅ Product removed from cart."
                else:
                    user_cart.product_ids = user_cart.product_ids + [product_id]
                    cart_action_status = "✅ Product added to cart."

                user_cart.updated_at = datetime.now(timezone.utc)
                session.add(user_cart)
                session.commit()
            else:
                cart = Cart(
                    user_id=user_id,
                    product_ids=[product_id],
                    updated_at=datetime.now(timezone.utc),
                )
                session.add(cart)
                session.commit()
                cart_action_status = "✅ New cart created and product added."

            return cart_action_status

    # @staticmethod
    # def remove_product_from_cart(user_id: int, product_id: str):
    #     with Session(engine) as session:
    #         user_cart = session.get(Cart, user_id)

    #         if not user_cart:
    #             raise ValueError("User cart not found.")

    #         if product_id not in user_cart.product_ids:
    #             raise ValueError("Product not found in cart.")

    #         user_cart.product_ids.remove(product_id)
    #         user_cart.updated_at = datetime.now(timezone.utc)
    #         session.add(user_cart)
    #         session.commit()

    #         print("✅ Product removed from cart.")
