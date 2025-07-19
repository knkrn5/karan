from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os


def verify_api_key(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    api_key = credentials.credentials

    if api_key != os.environ.get("ADMIN_PERMISSION"):
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing API key",
        )
