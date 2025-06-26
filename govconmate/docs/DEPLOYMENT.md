# Deployment Guide

## Overview
This guide covers deployment options for GovConMate across different environments.

## Development Environment

### Prerequisites
- Docker & Docker Compose
- OpenAI API Key

### Setup
```bash
# Clone repository
git clone https://github.com/quartermasters/GovConMate.git
cd GovConMate

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Start services
docker-compose up -d

# Verify deployment
curl http://localhost:8000/health
curl http://localhost:3000
```

## Production Deployment

### AWS Deployment (Recommended)

#### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI configured
- Docker installed
- Domain name (optional)

#### Architecture
```
Internet Gateway
    ↓
Application Load Balancer
    ↓
Target Groups
    ↓
ECS Fargate Services
    ├── Frontend (React)
    └── Backend (FastAPI)
    ↓
RDS PostgreSQL
Redis ElastiCache
S3 Bucket (Documents)
```

#### Step 1: Infrastructure Setup
```bash
# Create VPC and networking
aws cloudformation create-stack \
  --stack-name govconmate-infrastructure \
  --template-body file://infrastructure/aws/vpc.yaml

# Create RDS PostgreSQL
aws cloudformation create-stack \
  --stack-name govconmate-database \
  --template-body file://infrastructure/aws/rds.yaml \
  --parameters ParameterKey=DBPassword,ParameterValue=<strong-password>

# Create Redis cluster
aws cloudformation create-stack \
  --stack-name govconmate-cache \
  --template-body file://infrastructure/aws/redis.yaml
```

#### Step 2: Container Registry
```bash
# Create ECR repositories
aws ecr create-repository --repository-name govconmate/backend
aws ecr create-repository --repository-name govconmate/frontend

# Build and push images
$(aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com)

docker build -t govconmate/backend ./backend
docker tag govconmate/backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/govconmate/backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/govconmate/backend:latest

docker build -t govconmate/frontend ./frontend
docker tag govconmate/frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/govconmate/frontend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/govconmate/frontend:latest
```

#### Step 3: ECS Deployment
```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name govconmate-production

# Deploy services
aws cloudformation create-stack \
  --stack-name govconmate-services \
  --template-body file://infrastructure/aws/ecs.yaml \
  --parameters \
    ParameterKey=ImageURI,ParameterValue=<account-id>.dkr.ecr.us-east-1.amazonaws.com/govconmate/backend:latest \
  --capabilities CAPABILITY_IAM
```

### AWS GovCloud Deployment (For FedRAMP)

#### Prerequisites
- AWS GovCloud account
- FedRAMP compliance requirements
- Enhanced security measures

#### Differences from Commercial AWS
- All data stored in GovCloud regions
- Enhanced logging and monitoring
- Additional compliance controls
- Restricted third-party integrations

### Alternative Deployment Options

#### Digital Ocean App Platform
```yaml
# .do/app.yaml
name: govconmate
services:
- name: backend
  source_dir: backend
  dockerfile_path: Dockerfile
  instance_count: 2
  instance_size_slug: basic-s
  envs:
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
  - key: OPENAI_API_KEY
    value: ${OPENAI_API_KEY}
    type: SECRET

- name: frontend
  source_dir: frontend
  dockerfile_path: Dockerfile
  instance_count: 2
  instance_size_slug: basic-s

databases:
- name: db
  engine: PG
  version: "15"
  size: db-s-1vcpu-1gb
```

#### Google Cloud Run
```bash
# Build and deploy backend
gcloud builds submit --tag gcr.io/PROJECT-ID/govconmate-backend ./backend
gcloud run deploy govconmate-backend \
  --image gcr.io/PROJECT-ID/govconmate-backend \
  --platform managed \
  --region us-central1

# Build and deploy frontend
gcloud builds submit --tag gcr.io/PROJECT-ID/govconmate-frontend ./frontend
gcloud run deploy govconmate-frontend \
  --image gcr.io/PROJECT-ID/govconmate-frontend \
  --platform managed \
  --region us-central1
```

## Environment Configuration

### Production Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@prod-db:5432/govconmate
REDIS_URL=redis://prod-redis:6379

# Security
JWT_SECRET_KEY=<strong-random-key>
ENVIRONMENT=production

# OpenAI
OPENAI_API_KEY=sk-<your-production-key>

# AWS
AWS_ACCESS_KEY_ID=<production-access-key>
AWS_SECRET_ACCESS_KEY=<production-secret-key>
AWS_REGION=us-gov-west-1
AWS_S3_BUCKET=govconmate-prod-documents

# Monitoring
SENTRY_DSN=<sentry-dsn>
LOG_LEVEL=INFO
```

### Staging Environment
```bash
# Similar to production but with staging resources
DATABASE_URL=postgresql://user:password@staging-db:5432/govconmate
OPENAI_API_KEY=sk-<your-staging-key>
ENVIRONMENT=staging
```

## Security Configuration

### SSL/TLS Setup
```bash
# Using Let's Encrypt with Certbot
certbot --nginx -d api.govconmate.com -d app.govconmate.com

# Or AWS Certificate Manager for AWS deployments
aws acm request-certificate \
  --domain-name govconmate.com \
  --subject-alternative-names *.govconmate.com \
  --validation-method DNS
```

### Firewall Rules
```bash
# Allow only necessary ports
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 22/tcp    # SSH (from specific IPs only)
ufw deny 5432/tcp   # PostgreSQL (internal only)
ufw deny 6379/tcp   # Redis (internal only)
```

## Monitoring and Logging

### Application Monitoring
```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secure_password
```

### Log Aggregation
```bash
# Using AWS CloudWatch
aws logs create-log-group --log-group-name /aws/ecs/govconmate-backend
aws logs create-log-group --log-group-name /aws/ecs/govconmate-frontend
```

## Backup Strategy

### Database Backups
```bash
# Automated PostgreSQL backups
pg_dump $DATABASE_URL | gzip > backup-$(date +%Y%m%d-%H%M%S).sql.gz

# AWS RDS automated backups
aws rds create-db-snapshot \
  --db-instance-identifier govconmate-prod \
  --db-snapshot-identifier govconmate-backup-$(date +%Y%m%d)
```

### File Storage Backups
```bash
# S3 Cross-Region Replication
aws s3api put-bucket-replication \
  --bucket govconmate-documents \
  --replication-configuration file://replication.json
```

## Disaster Recovery

### Recovery Time Objectives (RTO)
- **Critical Systems**: 4 hours
- **Non-Critical Systems**: 24 hours

### Recovery Point Objectives (RPO)
- **Database**: 15 minutes
- **File Storage**: 1 hour

### Failover Procedures
1. DNS failover to backup region
2. Database restore from latest backup
3. Application deployment in backup region
4. Data synchronization and verification

## Performance Optimization

### Caching Strategy
```python
# Redis caching for API responses
CACHE_CONFIG = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

### CDN Configuration
```bash
# CloudFront distribution for static assets
aws cloudfront create-distribution \
  --distribution-config file://cdn-config.json
```

## Troubleshooting

### Common Issues
1. **Database Connection Errors**
   - Check security group rules
   - Verify connection strings
   - Test network connectivity

2. **API Rate Limiting**
   - Monitor OpenAI API usage
   - Implement request queuing
   - Add retry logic

3. **Memory Issues**
   - Monitor container memory usage
   - Optimize database queries
   - Implement pagination

### Health Checks
```bash
# Application health
curl https://api.govconmate.com/health

# Database connectivity
pg_isready -h db-host -p 5432

# Redis connectivity
redis-cli -h redis-host ping
```

---
**© 2025 Quartermasters FZC. All rights reserved.**