from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import get_db
from app.models import ElectricityLog, TransportLog, PurchaseLog, User
from app.schemas import (
    ElectricityLogCreate, ElectricityLog,
    TransportLogCreate, TransportLog,
    PurchaseLogCreate, PurchaseLog
)

router = APIRouter()

# Emission factors (kg CO2 per unit)
EMISSION_FACTORS = {
    "electricity": 0.5,  # kg CO2 per kWh
    "gasoline_car": 2.31,  # kg CO2 per liter
    "diesel_car": 2.68,  # kg CO2 per liter
    "electric_car": 0.05,  # kg CO2 per kWh (assuming clean grid)
    "food": 2.0,  # kg CO2 per kg
    "clothing": 8.0,  # kg CO2 per item
    "electronics": 50.0,  # kg CO2 per item
}


@router.post("/electricity/", response_model=ElectricityLog)
def create_electricity_log(
        log: ElectricityLogCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(lambda: User(id=1))  # Simplified for demo
):
    emission = log.electricity_usage * EMISSION_FACTORS["electricity"]

    db_log = ElectricityLog(
        user_id=current_user.id,
        electricity_usage=log.electricity_usage,
        emission=emission,
        date=datetime.utcnow()
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


@router.post("/transport/", response_model=TransportLog)
def create_transport_log(
        log: TransportLogCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(lambda: User(id=1))  # Simplified for demo
):
    if log.vehicle_type == "electric":
        emission_factor = EMISSION_FACTORS["electric_car"]
        energy_used = (log.distance / 100) * log.fuel_efficiency  # kWh
    elif log.vehicle_type == "diesel":
        emission_factor = EMISSION_FACTORS["diesel_car"]
        energy_used = (log.distance / 100) * log.fuel_efficiency  # liters
    else:  # gasoline
        emission_factor = EMISSION_FACTORS["gasoline_car"]
        energy_used = (log.distance / 100) * log.fuel_efficiency  # liters

    emission = energy_used * emission_factor

    db_log = TransportLog(
        user_id=current_user.id,
        vehicle_type=log.vehicle_type,
        distance=log.distance,
        fuel_efficiency=log.fuel_efficiency,
        emission=emission,
        date=datetime.utcnow()
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


@router.post("/purchase/", response_model=PurchaseLog)
def create_purchase_log(
        log: PurchaseLogCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(lambda: User(id=1))  # Simplified for demo
):
    emission_factor = EMISSION_FACTORS.get(log.category, 1.0)
    emission = log.amount * emission_factor

    db_log = PurchaseLog(
        user_id=current_user.id,
        item=log.item,
        category=log.category,
        amount=log.amount,
        emission=emission,
        date=datetime.utcnow()
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


@router.get("/electricity/", response_model=list[ElectricityLog])
def get_electricity_logs(
        db: Session = Depends(get_db),
        current_user: User = Depends(lambda: User(id=1))
):
    return db.query(ElectricityLog).filter(
        ElectricityLog.user_id == current_user.id
    ).all()


@router.get("/transport/", response_model=list[TransportLog])
def get_transport_logs(
        db: Session = Depends(get_db),
        current_user: User = Depends(lambda: User(id=1))
):
    return db.query(TransportLog).filter(
        TransportLog.user_id == current_user.id
    ).all()


@router.get("/purchase/", response_model=list[PurchaseLog])
def get_purchase_logs(
        db: Session = Depends(get_db),
        current_user: User = Depends(lambda: User(id=1))
):
    return db.query(PurchaseLog).filter(
        PurchaseLog.user_id == current_user.id
    ).all()