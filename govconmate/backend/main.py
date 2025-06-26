"""
GovConMate Backend API
Developed by Quartermasters FZC
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv

# Import database and models
from database import engine, Base
from models import *
from api.auth import router as auth_router

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GovConMate API",
    description="AI-Powered GovCon SuperApp Backend",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)

@app.get("/")
async def root():
    return {
        "message": "GovConMate API",
        "version": "0.1.0",
        "company": "Quartermasters FZC",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "govconmate-api"}

@app.get("/api/v1/ping")
async def ping():
    return {"message": "pong"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )