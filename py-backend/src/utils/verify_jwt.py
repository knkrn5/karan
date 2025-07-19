from typing import Any
import jwt
from fastapi import HTTPException, Request
import os


def verify_jwt(token: str):
    try:
        payload = jwt.decode(
            token, os.environ.get("ACCESS_TOKEN_SECRET"), algorithms=["HS256"]
        )
        print(f"Token payload: {payload}")
        return payload
    except jwt.InvalidSignatureError:
        raise HTTPException(status_code=401, detail="Invalid signature")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Token decode error")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def get_current_user_details(request: Request) -> dict[str, Any]:
    access_token: str | None = request.cookies.get("accessToken")
    if not access_token:
        raise HTTPException(status_code=401, detail="Access token is required")

    payload = verify_jwt(access_token)
    # user_id = payload.get("id")

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    return {
        "user_id": payload.get("id"),
        "email": payload.get("email"),
        "role": payload.get("role"),
    }
