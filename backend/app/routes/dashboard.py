from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import get_db
from app.models import ElectricityLog, TransportLog, PurchaseLog, User
from app.schemas import DashboardResponse, DashboardSummary, CategoryBreakdown, TrendData, Recommendation

router = APIRouter()


@router.get("/", response_model=DashboardResponse)
def get_dashboard_data(
        db: Session = Depends(get_db),
        current_user: User = Depends(lambda: User(id=1))  # Simplified for demo
):
    # Get data from last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)

    # Calculate total emissions
    electricity_emissions = db.query(ElectricityLog).filter(
        ElectricityLog.user_id == current_user.id,
        ElectricityLog.date >= thirty_days_ago
    ).all()

    transport_emissions = db.query(TransportLog).filter(
        TransportLog.user_id == current_user.id,
        TransportLog.date >= thirty_days_ago
    ).all()

    purchase_emissions = db.query(PurchaseLog).filter(
        PurchaseLog.user_id == current_user.id,
        PurchaseLog.date >= thirty_days_ago
    ).all()

    total_emissions = (
            sum(log.emission for log in electricity_emissions) +
            sum(log.emission for log in transport_emissions) +
            sum(log.emission for log in purchase_emissions)
    )

    # Calculate category breakdown
    electricity_total = sum(log.emission for log in electricity_emissions)
    transport_total = sum(log.emission for log in transport_emissions)
    purchase_total = sum(log.emission for log in purchase_emissions)

    categories = [
        CategoryBreakdown(
            category="Electricity",
            emissions=electricity_total,
            percentage=(electricity_total / total_emissions * 100) if total_emissions > 0 else 0
        ),
        CategoryBreakdown(
            category="Transport",
            emissions=transport_total,
            percentage=(transport_total / total_emissions * 100) if total_emissions > 0 else 0
        ),
        CategoryBreakdown(
            category="Purchases",
            emissions=purchase_total,
            percentage=(purchase_total / total_emissions * 100) if total_emissions > 0 else 0
        )
    ]

    # Generate weekly trend (simplified)
    weekly_trend = [
        TrendData(date="Week 1", emissions=total_emissions * 0.8),
        TrendData(date="Week 2", emissions=total_emissions * 0.9),
        TrendData(date="Week 3", emissions=total_emissions * 1.1),
        TrendData(date="Week 4", emissions=total_emissions)
    ]

    # Generate recommendations
    recommendations = [
        Recommendation(
            title="Reduce Electricity Usage",
            description="Try using energy-efficient appliances",
            impact="Could reduce emissions by 15%"
        ),
        Recommendation(
            title="Use Public Transport",
            description="Consider taking the bus or train instead of driving",
            impact="Could reduce emissions by 30%"
        )
    ]

    summary = DashboardSummary(
        total_emissions=total_emissions,
        emissions_trend=10.5,  # Example trend
        logs_count=len(electricity_emissions) + len(transport_emissions) + len(purchase_emissions)
    )

    return DashboardResponse(
        summary=summary,
        category_breakdown=categories,
        weekly_trend=weekly_trend,
        recommendations=recommendations
    )