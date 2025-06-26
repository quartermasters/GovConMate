# GovConMate - AI-Powered GovCon SuperApp

**Developed by Quartermasters FZC**

## Overview
GovConMate is an AI-powered mobile and web application designed to tutor, train, and assist businesses and professionals involved in U.S. Federal Government Contracting (GovCon). Built with cutting-edge AI technology to revolutionize how contractors approach federal opportunities.

## Team
- **Haroon Haider** - CTO & Co-Founder
- **Aatika Gilani** - Product Manager & Business Analyst
- **Claude AI** - Development Partner

## 🚀 Current Status: MVP Foundation Complete
✅ User Authentication & Registration  
✅ Database Schema & Models  
✅ API Infrastructure  
✅ Frontend UI Components  
✅ Docker Development Environment  

**Next Phase**: RFP Analyzer with OpenAI Integration

## Project Structure
```
govconmate/
├── backend/                 # FastAPI backend application
│   ├── models/             # Database models (User, RFP, Proposal)
│   ├── auth/               # Authentication & security
│   ├── api/                # API endpoints
│   ├── crud/               # Database operations
│   ├── schemas/            # Pydantic models
│   └── main.py             # FastAPI app
├── frontend/               # React web application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # Tailwind CSS
│   └── public/
├── docs/                   # Documentation
├── docker-compose.yml      # Development environment
└── README.md               # This file
```

## Technology Stack
- **Backend**: FastAPI + PostgreSQL + Redis + JWT Authentication
- **Frontend**: React.js + Tailwind CSS + Axios
- **AI/ML**: OpenAI GPT-4 API + LangChain (integrated)
- **Infrastructure**: Docker + AWS (planned)
- **Database**: PostgreSQL with GovCon-specific schema
- **Security**: bcrypt password hashing, JWT tokens, CORS protection

## 🎯 Key Features (Planned)
- **AI RFP Analyzer**: Upload solicitations, get instant analysis
- **Proposal Generator**: AI-assisted proposal writing
- **Training Hub**: Interactive GovCon certification courses
- **Performance Dashboard**: Track wins, losses, and metrics
- **Document Vault**: Secure proposal and contract storage
- **Partner Matching**: Find teaming partners using CPARS data

## 🛠️ Development Setup

### Prerequisites
- Docker & Docker Compose
- OpenAI API Key

### Quick Start
1. **Clone and setup environment:**
   ```bash
   cd govconmate
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

2. **Start development environment:**
   ```bash
   docker-compose up -d
   ```

3. **Access applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/docs
   - Database: localhost:5432 (govconmate/password)

### Testing the Application
1. Visit http://localhost:3000
2. Click "Get Started" to register
3. Login with your credentials
4. Access the dashboard

## 📊 Database Schema
- **Users**: Complete profiles with GovCon fields (CAGE, DUNS, NAICS, PSC)
- **RFPs**: Solicitation analysis and AI recommendations
- **Proposals**: Multi-volume proposal management
- **Authentication**: Secure JWT-based user sessions

## 🔐 Security Features
- Bcrypt password hashing
- JWT token authentication
- CORS protection
- Input validation with Pydantic
- Prepared for SOC 2 compliance

## 📈 Development Roadmap
- **Phase 1**: MVP Foundation ✅ COMPLETE
- **Phase 2**: RFP Analyzer with AI (Current)
- **Phase 3**: Proposal Generation Engine
- **Phase 4**: Training & Certification System
- **Phase 5**: Community & Advanced Features

## 🤝 API Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/auth/me` - Get current user profile
- More endpoints coming with RFP analyzer...

## 📝 Environment Variables
```bash
DATABASE_URL=postgresql://govconmate:password@localhost:5432/govconmate
REDIS_URL=redis://localhost:6379
JWT_SECRET_KEY=your-super-secret-jwt-key
OPENAI_API_KEY=sk-your-openai-api-key
```

## 🧪 Development Commands
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

---
**© 2025 Quartermasters FZC. All rights reserved.**  
*Empowering Government Contractors with AI*