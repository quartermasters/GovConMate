"""
RFP and Proposal models
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Float, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import enum

class RFPStatus(str, enum.Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    ANALYZED = "analyzed"
    ERROR = "error"

class ProposalStatus(str, enum.Enum):
    DRAFT = "draft"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    SUBMITTED = "submitted"
    WON = "won"
    LOST = "lost"

class RFP(Base):
    __tablename__ = "rfps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Basic Info
    title = Column(String, nullable=False)
    solicitation_number = Column(String, index=True)
    agency = Column(String)
    office = Column(String)
    file_path = Column(String)  # S3 path to original document
    file_name = Column(String)
    file_size = Column(Integer)
    
    # Analysis Results
    status = Column(Enum(RFPStatus), default=RFPStatus.UPLOADED)
    ai_summary = Column(Text)
    scope_of_work = Column(Text)
    requirements = Column(JSON)  # Structured requirements
    compliance_matrix = Column(JSON)
    go_no_go_score = Column(Float)
    ai_recommendations = Column(Text)
    
    # Dates
    due_date = Column(DateTime)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Proposal(Base):
    __tablename__ = "proposals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rfp_id = Column(Integer, ForeignKey("rfps.id"), nullable=False)
    
    # Basic Info
    title = Column(String, nullable=False)
    version = Column(String, default="1.0")
    status = Column(Enum(ProposalStatus), default=ProposalStatus.DRAFT)
    
    # Content
    technical_volume = Column(Text)
    price_volume = Column(Text)
    compliance_volume = Column(Text)
    past_performance = Column(Text)
    
    # Metadata
    estimated_value = Column(Float)
    win_probability = Column(Float)
    ai_feedback = Column(Text)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    submitted_at = Column(DateTime)