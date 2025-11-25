from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # Relationships
    electricity_logs = relationship("ElectricityLog", back_populates="user")
    transport_logs = relationship("TransportLog", back_populates="user")
    purchase_logs = relationship("PurchaseLog", back_populates="user")
    achievements = relationship("Achievement", back_populates="user")


class ElectricityLog(Base):
    __tablename__ = "electricity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=func.now())
    electricity_usage = Column(Float)  # kWh
    emission = Column(Float)  # kg CO2

    user = relationship("User", back_populates="electricity_logs")


class TransportLog(Base):
    __tablename__ = "transport_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=func.now())
    vehicle_type = Column(String)
    distance = Column(Float)  # km
    fuel_efficiency = Column(Float)  # L/100km or kWh/100km
    emission = Column(Float)  # kg CO2

    user = relationship("User", back_populates="transport_logs")


class PurchaseLog(Base):
    __tablename__ = "purchase_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=func.now())
    item = Column(String)
    category = Column(String)
    amount = Column(Float)
    emission = Column(Float)  # kg CO2

    user = relationship("User", back_populates="purchase_logs")


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(Text)
    achieved_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="achievements")