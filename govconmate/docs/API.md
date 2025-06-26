# GovConMate API Documentation

## Base URL
```
Development: http://localhost:8000
Production: TBD
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /api/v1/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "company": "Acme Corp",
  "phone": "+1-555-0123"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "company": "Acme Corp",
  "phone": "+1-555-0123",
  "role": "user",
  "status": "active",
  "is_verified": false,
  "cage_code": null,
  "duns_number": null,
  "created_at": "2025-01-01T00:00:00Z",
  "last_login": null
}
```

#### POST /api/v1/auth/login
Authenticate user and receive access token.

**Request Body (Form Data):**
```
username: user@example.com
password: securepassword123
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### GET /api/v1/auth/me
Get current user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "company": "Acme Corp",
  "phone": "+1-555-0123",
  "role": "user",
  "status": "active",
  "is_verified": false,
  "cage_code": null,
  "duns_number": null,
  "created_at": "2025-01-01T00:00:00Z",
  "last_login": "2025-01-01T12:00:00Z"
}
```

### Health Check

#### GET /health
Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "service": "govconmate-api"
}
```

#### GET /api/v1/ping
Simple ping endpoint for testing.

**Response:**
```json
{
  "message": "pong"
}
```

### System Information

#### GET /
Get basic API information.

**Response:**
```json
{
  "message": "GovConMate API",
  "version": "0.1.0",
  "company": "Quartermasters FZC",
  "status": "running"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden
```json
{
  "detail": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

## Rate Limiting
- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per user
- **File upload endpoints**: 10 requests per minute per user

## Data Models

### User
```json
{
  "id": "integer",
  "email": "string (email format)",
  "username": "string (unique)",
  "first_name": "string",
  "last_name": "string",
  "company": "string (optional)",
  "phone": "string (optional)",
  "role": "enum (user, premium, enterprise, admin)",
  "status": "enum (active, inactive, suspended)",
  "is_verified": "boolean",
  "cage_code": "string (optional)",
  "duns_number": "string (optional)",
  "naics_codes": "string (JSON, optional)",
  "psc_codes": "string (JSON, optional)",
  "security_clearance": "string (optional)",
  "created_at": "datetime",
  "updated_at": "datetime",
  "last_login": "datetime (optional)"
}
```

### RFP (Coming Soon)
```json
{
  "id": "integer",
  "user_id": "integer",
  "title": "string",
  "solicitation_number": "string",
  "agency": "string",
  "office": "string",
  "file_path": "string",
  "file_name": "string",
  "file_size": "integer",
  "status": "enum (uploaded, processing, analyzed, error)",
  "ai_summary": "string",
  "scope_of_work": "string",
  "requirements": "object",
  "compliance_matrix": "object",
  "go_no_go_score": "float",
  "ai_recommendations": "string",
  "due_date": "datetime",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Proposal (Coming Soon)
```json
{
  "id": "integer",
  "user_id": "integer",
  "rfp_id": "integer",
  "title": "string",
  "version": "string",
  "status": "enum (draft, in_progress, review, submitted, won, lost)",
  "technical_volume": "string",
  "price_volume": "string",
  "compliance_volume": "string",
  "past_performance": "string",
  "estimated_value": "float",
  "win_probability": "float",
  "ai_feedback": "string",
  "created_at": "datetime",
  "updated_at": "datetime",
  "submitted_at": "datetime"
}
```

## Interactive Documentation
Visit `/api/docs` for interactive Swagger UI documentation when running the development server.

---
**© 2025 Quartermasters FZC. All rights reserved.**