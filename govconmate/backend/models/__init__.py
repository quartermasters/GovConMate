"""
Database models for GovConMate
"""

from .user import User, UserRole, UserStatus
from .rfp import RFP, Proposal, RFPStatus, ProposalStatus

# Add relationships
User.rfps = relationship("RFP", back_populates="user")
User.proposals = relationship("Proposal", back_populates="user")

__all__ = [
    "User", "UserRole", "UserStatus",
    "RFP", "Proposal", "RFPStatus", "ProposalStatus"
]