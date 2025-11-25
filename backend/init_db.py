"""
Database initialization script
Run this to create tables and seed initial data
"""
from app.database import engine, SessionLocal
from app.models import Base, EmissionFactor
from datetime import datetime


def init_database():
    """Create all tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created successfully")


def seed_emission_factors():
    """Seed initial emission factors"""
    print("\nSeeding emission factors...")

    db = SessionLocal()

    factors = [
        {
            "category": "electricity",
            "unit": "kWh",
            "factor_value": 0.18,
            "region": "Kenya",
            "source": "Kenya Power Grid Mix 2023"
        },
        {
            "category": "petrol",
            "unit": "liter",
            "factor_value": 2.31,
            "region": "Global",
            "source": "IPCC 2023"
        },
        {
            "category": "diesel",
            "unit": "liter",
            "factor_value": 2.68,
            "region": "Global",
            "source": "IPCC 2023"
        },
        {
            "category": "car",
            "unit": "km",
            "factor_value": 0.12,
            "region": "Global",
            "source": "Average passenger vehicle"
        },
        {
            "category": "bus",
            "unit": "km",
            "factor_value": 0.05,
            "region": "Global",
            "source": "Public transport average"
        },
        {
            "category": "motorbike",
            "unit": "km",
            "factor_value": 0.08,
            "region": "Global",
            "source": "Average motorcycle"
        },
        {
            "category": "food",
            "subcategory": "meal",
            "unit": "meal",
            "factor_value": 2.5,
            "region": "Global",
            "source": "Average meal carbon footprint"
        },
        {
            "category": "electronics",
            "unit": "item",
            "factor_value": 50.0,
            "region": "Global",
            "source": "Average electronic device production"
        },
        {
            "category": "clothing",
            "unit": "item",
            "factor_value": 15.0,
            "region": "Global",
            "source": "Average clothing item production"
        }
    ]

    try:
        for factor_data in factors:
            # Check if factor already exists
            existing = db.query(EmissionFactor).filter(
                EmissionFactor.category == factor_data["category"]
            ).first()

            if not existing:
                factor = EmissionFactor(**factor_data)
                db.add(factor)
                print(
                    f"  ✓ Added: {factor_data['category']} - {factor_data['factor_value']} kg CO2e/{factor_data['unit']}")

        db.commit()
        print("\n✓ Emission factors seeded successfully")

    except Exception as e:
        print(f"\n✗ Error seeding data: {e}")
        db.rollback()

    finally:
        db.close()


if __name__ == "__main__":
    print("=" * 50)
    print("Carbon Tracker - Database Initialization")
    print("=" * 50)

    init_database()
    seed_emission_factors()

    print("\n" + "=" * 50)
    print("Database initialization complete!")
    print("=" * 50)
    print("\nYou can now start the server with:")
    print("  uvicorn app.main:app --reload")
    print("=" * 50)