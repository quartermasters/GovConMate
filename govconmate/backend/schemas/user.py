"""
Pydantic schemas for user-related operations
"""

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from models.user import UserRole, UserStatus

class UserBase(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    company: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    cage_code: Optional[str] = None
    duns_number: Optional[str] = None
    naics_codes: Optional[str] = None
    psc_codes: Optional[str] = None
    security_clearance: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    role: UserRole
    status: UserStatus
    is_verified: bool
    cage_code: Optional[str] = None
    duns_number: Optional[str] = None
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None