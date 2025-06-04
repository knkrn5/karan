# utils/auth.py
import jwt
from fastapi import HTTPException, Request
import os


def verify_token(token: str):
    try:
        payload = jwt.decode(
            token, os.environ.get("ACCESS_TOKEN_SECRET"), algorithms=["HS256"]
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def get_current_user(request: Request):
    access_token = request.cookies.get("accessToken")
    if not access_token:
        raise HTTPException(status_code=401, detail="Access token is required")

    payload = verify_token(access_token)
    user_id = payload.get("userId") 

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    return {"user_id": user_id, "email": payload.get("email"), "payload": payload}
