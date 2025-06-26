# Contributing to GovConMate

We welcome contributions to GovConMate! This document provides guidelines for contributing to the project.

## Development Team
- **Haroon Haider** - CTO & Co-Founder
- **Aatika Gilani** - Product Manager & Business Analyst  
- **Claude AI** - Development Partner

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- Git

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/GovConMate.git
   cd GovConMate
   ```
3. Copy environment template:
   ```bash
   cp .env.example .env
   # Add your OpenAI API key and other required variables
   ```
4. Start development environment:
   ```bash
   docker-compose up -d
   ```

## Development Workflow

### Branch Naming
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `docs/` - Documentation updates

### Commit Messages
Follow conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add RFP upload functionality
fix: resolve authentication token expiry issue
docs: update API documentation
```

### Code Style

#### Backend (Python/FastAPI)
- Follow PEP 8 style guide
- Use type hints
- Maximum line length: 88 characters
- Use black for code formatting
- Use meaningful variable and function names

#### Frontend (React/JavaScript)
- Use ESLint and Prettier
- Use camelCase for variables and functions
- Use PascalCase for components
- Maximum line length: 80 characters
- Use meaningful component and variable names

### Security Guidelines
- Never commit API keys, passwords, or sensitive data
- Always validate user input
- Use prepared statements for database queries
- Follow OWASP security guidelines
- Report security vulnerabilities privately

### Testing
- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Test coverage should be maintained above 80%
- Test both positive and negative scenarios

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes with proper commit messages
3. Add/update tests as needed
4. Update documentation if required
5. Submit a pull request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots for UI changes
   - Test results

### Code Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No sensitive data is exposed
- [ ] Performance impact is considered
- [ ] Security best practices are followed

## Project Structure

### Backend Structure
```
backend/
├── models/         # Database models
├── schemas/        # Pydantic schemas
├── crud/          # Database operations
├── api/           # API endpoints
├── auth/          # Authentication logic
├── services/      # Business logic
└── tests/         # Test files
```

### Frontend Structure
```
frontend/src/
├── components/    # Reusable components
├── pages/         # Page components
├── services/      # API services
├── utils/         # Utility functions
├── styles/        # CSS and styling
└── tests/         # Test files
```

## API Guidelines
- Use RESTful conventions
- Include proper HTTP status codes
- Provide clear error messages
- Document all endpoints
- Use consistent naming conventions
- Include request/response examples

## Database Guidelines
- Use descriptive table and column names
- Include proper indexes
- Document schema changes
- Use migrations for schema updates
- Follow data privacy regulations

## Documentation
- Update README.md for major changes
- Document API endpoints
- Comment complex business logic
- Include code examples
- Keep documentation up to date

## Issue Reporting
When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## Questions and Support
- Create GitHub issues for bugs and feature requests
- Use discussions for questions and ideas
- Contact team leads for architectural decisions

## License
By contributing to GovConMate, you agree that your contributions will be licensed under the MIT License.

---
**© 2025 Quartermasters FZC. All rights reserved.**