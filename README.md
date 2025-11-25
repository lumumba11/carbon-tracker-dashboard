# 🌍 Carbon Tracking Dashboard

A full-stack web application that helps users monitor, visualize, and reduce their carbon footprint through intuitive data tracking and insightful analytics.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Tech Stack](https://img.shields.io/badge/FastAPI-0.104.1-009688?logo=fastapi)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC?logo=tailwind-css)
![Tech Stack](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

## 📊 Overview

The Carbon Tracking Dashboard empowers individuals and organizations to take control of their environmental impact by providing a comprehensive platform to track, analyze, and reduce carbon emissions across daily activities.

### 🌟 Key Features

- **📈 Real-time Emissions Dashboard** - Visualize your carbon footprint with interactive charts
- **⚡ Electricity Tracking** - Monitor energy consumption and calculate emissions
- **🚗 Transportation Logging** - Track vehicle usage and travel carbon costs
- **🛍️ Purchase Monitoring** - Log consumption habits and their environmental impact
- **🌱 Smart Recommendations** - AI-powered suggestions to reduce your footprint
- **📱 Responsive Design** - Seamless experience across all devices
- **🔐 Secure Authentication** - JWT-based user accounts and data protection

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful and responsive data visualizations
- **Lucide React** - Elegant icon library

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - Database ORM and management
- **Pydantic** - Data validation and serialization
- **JWT** - Secure token-based authentication
- **Python-JOSE** - Cryptographic signing and verification

### Database & Infrastructure
- **SQLite** - Lightweight database for development
- **PostgreSQL** - Production-ready database support
- **Docker** - Containerization for easy deployment
- **Docker Compose** - Multi-container orchestration

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- Docker (optional)

### Method 1: Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/lumumba11/carbon-tracker-dashboard.git
cd carbon-tracker-dashboard

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Method 2: Manual Setup
```bash
# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend Setup (new terminal)
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
carbon-tracking-dashboard/
├── 🎨 frontend/                 # React application
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── main.jsx            # Application entry point
│   │   └── index.css           # Global styles with Tailwind
│   └── package.json            # Dependencies and scripts
├── ⚙️ backend/                  # FastAPI application
│   ├── app/
│   │   ├── routes/             # API endpoints
│   │   │   ├── auth.py         # Authentication routes
│   │   │   ├── logs.py         # Emission logging routes
│   │   │   └── dashboard.py    # Dashboard data routes
│   │   ├── models.py           # Database models
│   │   ├── schemas.py          # Pydantic schemas
│   │   └── main.py             # FastAPI application
│   └── requirements.txt        # Python dependencies
├── 🐳 docker-compose.yml       # Multi-container setup
└── 📚 documentation/           # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/token` - User login (JWT token)

### Emission Logging
- `POST /api/logs/electricity/` - Log electricity usage
- `POST /api/logs/transport/` - Log transportation data
- `POST /api/logs/purchase/` - Log purchase information

### Dashboard
- `GET /api/dashboard/` - Get comprehensive dashboard data

## 🌱 Emission Calculations

The application uses industry-standard emission factors:

- **Electricity**: 0.5 kg CO₂ per kWh
- **Gasoline Vehicles**: 2.31 kg CO₂ per liter
- **Diesel Vehicles**: 2.68 kg CO₂ per liter  
- **Electric Vehicles**: 0.05 kg CO₂ per kWh
- **Food**: 2.0 kg CO₂ per kg
- **Clothing**: 8.0 kg CO₂ per item
- **Electronics**: 50.0 kg CO₂ per item

## 📊 Features in Detail

### Interactive Dashboard
- Real-time emission summaries
- Category-wise breakdown (Electricity, Transport, Purchases)
- Weekly trend analysis
- Personalized reduction recommendations

### Smart Logging
- Intuitive forms for data entry
- Automatic emission calculations
- Historical data tracking
- Multi-category support

### Data Visualization
- Pie charts for category distribution
- Line charts for trend analysis
- Progress indicators
- Comparative analytics

## 🎯 Use Cases

- **Individuals** - Track personal carbon footprint
- **Educational Institutions** - Environmental awareness programs
- **Businesses** - Corporate sustainability tracking
- **Environmental Organizations** - Community engagement tools

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues for bugs and feature requests.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Emission factors based on IPCC and EPA standards
- Icons provided by Lucide React
- Charts powered by Recharts
- Built with FastAPI and React communities

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub.

---

**Built with ❤️ for a sustainable future** 🌱

*Track your impact, make a difference!*

---

<div align="center">

### 🌟 Star this repository if you find it helpful!

[⬆ Back to Top](#-carbon-tracking-dashboard)

</div>
