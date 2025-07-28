from typing import Any
from pydantic import BaseModel
from sqlmodel import create_engine, Session, select
from collections.abc import Sequence
from ..models.affliateproducts_model import Product, Cart
from datetime import datetime, timezone
from ..db.postgresDb import DATABASE_URL
from ..utils.api_response import ApiResponse

from ..routes.productsarr import allProductsArr


# Ensure DATABASE_URL is a string
engine = create_engine(str(DATABASE_URL))


class AffiliateProductsService:
    @staticmethod
    def get_products() -> ApiResponse:
        try:
            with Session(engine) as session:
                product = session.exec(select(Product)).all()
                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message="Products fetched successfully.",
                    data=product,
                )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error fetching products: {e}",
                data=None,
            )

    @staticmethod
    def get_cart_items(user_id: int) -> ApiResponse:
        try:
            with Session(engine) as session:
                user_cart: Cart | None = session.get(Cart, user_id)

                if not user_cart:
                    return ApiResponse(
                        status_code=404,
                        is_success=False,
                        message="Cart not found.",
                        data=None,
                    )

                product_ids: list[str] = user_cart.product_ids

                if not product_ids:
                    return ApiResponse(
                        status_code=404,
                        is_success=False,
                        message="No products found in cart.",
                        data=None,
                    )

                # Fetch the products using the product IDs
                products_in_cart: Sequence[Product] = session.exec(
                    select(Product).where(Product.id.in_(product_ids))  # pyright: ignore[reportAttributeAccessIssue]
                ).all()

                print(f"✅ Fetched {len(products_in_cart)} products from the cart.")

                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message="Cart items fetched successfully.",
                    data=products_in_cart,
                )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error fetching cart items for user: {e}",
                data=None,
            )

    @staticmethod
    def add_remove_product_from_cart(user_id: str, product_id: str) -> ApiResponse:
        try:
            with Session(engine) as session:
                # Validate product exists
                product = session.get(Product, product_id)
                if not product:
                    raise ValueError(f"Product not found with ID: {product_id}")

                # Fetch user's cart (single row per user)
                user_cart = session.get(Cart, user_id)

                if user_cart:
                    if product_id in user_cart.product_ids:
                        user_cart.product_ids = [
                            pid for pid in user_cart.product_ids if pid != product_id
                        ]
                        cart_action_status = "Product removed from cart"
                    else:
                        user_cart.product_ids = user_cart.product_ids + [product_id]
                        cart_action_status = "Product added to cart"

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
                    cart_action_status = "New cart created and product added."

                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message=cart_action_status,
                    data=None,
                )
        except Exception as e:
            return ApiResponse(
                status_code=400,
                is_success=False,
                message=f"Error adding/removing product from cart: {e}",
                data=None,
            )

    @staticmethod
    def add_all_products() -> ApiResponse:
        try:

            class AffiliateLink(BaseModel):
                platform: str
                link: str
                price: float

            transformed_products: list[Any] = []

            with Session(engine) as session:
                for product_data in allProductsArr:
                    # if not isinstance(product_data, AllProductsTypes):
                    #   raise TypeError("Product data must be of type AllProductsTypes.")
                    if product_data.affiliateLinks:
                        if isinstance(product_data.affiliateLinks, list):
                            print(
                                "Affiliate links for product is list not parsing this one "
                            )
                            continue

                    if product_data.affiliateLink and product_data.price:
                        LinksDetails = AffiliateLink(
                            platform="amazon"
                            if "amzn" in product_data.affiliateLink
                            else "not-available",
                            link=product_data.affiliateLink,
                            price=product_data.price
                            if "amzn" in product_data.affiliateLink
                            else 0.0,
                        )

                        # new_product = {k: v for k, v in product_data.items() if k not in keys_to_remove}
                        # del product_data["price"]
                        # del product_data["affiliateLink"]

                        # print(LinksDetails.model_dump())
                        # print(LinksDetails.model_dump_json())
                        affiliateLinks = LinksDetails.model_dump()
                        # print(affiliateLinks)
                        new_product = product_data.model_dump(
                            exclude={"price", "affiliateLink"}
                        )

                        # keys_to_remove = ["price", "affiliateLink"]
                        # new_product = {
                        #     k: v
                        #     for k, v in product_data_dict.items()
                        #     if k not in keys_to_remove
                        # }
                        new_product["affiliateLinks"] = [affiliateLinks]
                        # print(new_product)
                        # break

                        transformed_products.append(new_product)
                        # transformed_products =  [product(**new_product) for new_product in transformed_products]
                        # print(transformed_products)
                        # break

                # print(transformed_products)

                for new_product_dict in transformed_products:
                    product = Product(**new_product_dict)
                    session.add(product)
                    print(new_product_dict)
                    print("==============================================")

                session.commit()
                return ApiResponse(
                    status_code=200,
                    is_success=True,
                    message="All products added successfully.",
                    data=transformed_products,
                )
        except Exception as e:
            return ApiResponse(
                status_code=500,
                is_success=False,
                message=f"Error adding all products: {e}",
                data=None,
            )
