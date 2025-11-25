from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional


# User Schemas
class UserBase(BaseModel):
    email: str
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


# Log Schemas
class LogBase(BaseModel):
    date: datetime
    emission: float


class ElectricityLogCreate(BaseModel):
    electricity_usage: float


class ElectricityLog(LogBase):
    id: int
    user_id: int
    electricity_usage: float

    class Config:
        from_attributes = True


class TransportLogCreate(BaseModel):
    vehicle_type: str
    distance: float
    fuel_efficiency: float


class TransportLog(LogBase):
    id: int
    user_id: int
    vehicle_type: str
    distance: float
    fuel_efficiency: float

    class Config:
        from_attributes = True


class PurchaseLogCreate(BaseModel):
    item: str
    category: str
    amount: float


class PurchaseLog(LogBase):
    id: int
    user_id: int
    item: str
    category: str
    amount: float

    class Config:
        from_attributes = True


# Dashboard Schemas
class DashboardSummary(BaseModel):
    total_emissions: float
    emissions_trend: float
    logs_count: int


class CategoryBreakdown(BaseModel):
    category: str
    emissions: float
    percentage: float


class TrendData(BaseModel):
    date: str
    emissions: float


class Recommendation(BaseModel):
    title: str
    description: str
    impact: str


class DashboardResponse(BaseModel):
    summary: DashboardSummary
    category_breakdown: List[CategoryBreakdown]
    weekly_trend: List[TrendData]
    recommendations: List[Recommendation]