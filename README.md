# Task Management API

REST API for task and user management built with Node.js, Express, PostgreSQL and Prisma.

This project implements user registration, secure password hashing, JWT authentication, protected routes, task authorization, input validation, automated testing, Swagger/OpenAPI documentation and Docker containerization.

The main goal of this project is to demonstrate backend development practices including RESTful API design, authentication and authorization, relational database modeling, error handling, automated testing, API documentation and containerized development.

---

## 🚀 Technologies

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JavaScript
- bcrypt
- JSON Web Token (JWT)
- Swagger / OpenAPI
- Jest
- Supertest
- Nodemon
- Docker
- Docker Compose

---

## 📋 Features

- User registration
- User CRUD operations
- Task CRUD operations
- PostgreSQL database
- Prisma ORM
- User-task relationships
- Password hashing with bcrypt
- JWT authentication
- Authentication middleware
- Protected routes
- User-based task authorization
- Input validation
- Email format validation
- Duplicate email handling
- Invalid credentials handling
- Database error handling
- HTTP status code management
- Environment variables
- Automated API tests
- Swagger/OpenAPI documentation
- Prisma database migrations
- Docker containerization
- Docker Compose development environment
- Organized project structure

---

## 📁 Project Structure

```text
task-management-api/
│
├── prisma/
│   ├── migrations/
│   │   ├── 20260908161832_init/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
│
├── src/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   └── auth.routes.js
│   │
│   ├── config/
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │   ├── tasks.controller.js
│   │   └── users.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   ├── tasks.routes.js
│   │   └── users.routes.js
│   │
│   ├── app.js
│   ├── server.js
│   └── swagger.js
│
├── tests/
│   ├── auth.test.js
│   ├── tasks.test.js
│   └── users.test.js
│
├── .dockerignore
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_management?schema=public"
JWT_SECRET="your-secret-key"
```

Never upload your `.env` file, database credentials or JWT secrets to GitHub.

The `.env.example` file is provided as a reference without real credentials.

---

# 💻 Running the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/santyduque11/task-management-api.git
```

## 2. Enter the project directory

```bash
cd task-management-api
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure PostgreSQL

Make sure PostgreSQL is installed and running.

Create a database named:

```text
task_management
```

Configure the `DATABASE_URL` in your `.env` file.

## 5. Generate Prisma Client

```bash
npx prisma generate
```

## 6. Apply database migrations

```bash
npx prisma migrate deploy
```

For development, when creating a new migration:

```bash
npx prisma migrate dev --name migration_name
```

---

# 🐳 Running with Docker

Docker Compose provides a complete development environment with:

- Node.js API
- PostgreSQL database
- Prisma ORM
- Docker networking
- Persistent PostgreSQL storage

## 1. Build the Docker image

```bash
docker compose build
```

## 2. Start the containers

```bash
docker compose up -d
```

## 3. Check container status

```bash
docker compose ps
```

The expected services are:

```text
task-management-api
task-management-db
```

The API is available at:

```text
http://localhost:3000
```

PostgreSQL is exposed on:

```text
localhost:5433
```

Inside the Docker network, the API connects to PostgreSQL using:

```text
postgres:5432
```

## 4. Apply database migrations

```bash
docker compose exec api npx prisma migrate deploy
```

## 5. View API logs

```bash
docker compose logs api
```

## 6. Stop the containers

```bash
docker compose down
```

The PostgreSQL data is stored in a Docker volume named:

```text
task-management-api_postgres_data
```

This allows the database data to persist when containers are stopped.

---

# 📚 API Documentation

This project includes interactive API documentation using Swagger/OpenAPI.

After starting the API, open:

```text
http://localhost:3000/api-docs
```

Swagger allows you to:

- Explore API endpoints
- View request parameters
- View request bodies
- Test endpoints directly from the browser
- Authenticate using JWT
- Review HTTP responses
- Understand API schemas

---

# 🔐 Authentication

The API uses JSON Web Tokens (JWT) to protect private resources.

Authentication flow:

```text
User
 │
 ▼
POST /api/auth/login
 │
 ▼
JWT Token
 │
 ▼
Authorization: Bearer <token>
 │
 ▼
Authentication Middleware
 │
 ▼
Protected Resource
```

Protected endpoints require a valid JWT token.

Swagger provides an `Authorize` button that can be used to authenticate requests.

---

# 👤 Users API

Main endpoints:

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| POST   | `/api/users`     | No             |
| GET    | `/api/users`     | Yes            |
| GET    | `/api/users/:id` | Yes            |
| PUT    | `/api/users/:id` | Yes            |
| DELETE | `/api/users/:id` | Yes            |

---

# 📋 Tasks API

Main endpoints:

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| GET    | `/api/tasks`     | Yes            |
| GET    | `/api/tasks/:id` | Yes            |
| POST   | `/api/tasks`     | Yes            |
| PUT    | `/api/tasks/:id` | Yes            |
| DELETE | `/api/tasks/:id` | Yes            |

Tasks are associated with users and protected by authorization rules.

---

# 🧪 Testing

The project uses Jest and Supertest for automated API testing.

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate the coverage report:

```bash
npm run test:coverage
```

The project currently contains automated tests for:

- User registration
- User retrieval
- User updates
- User deletion
- User validation
- Duplicate emails
- Invalid IDs
- Authentication
- Login validation
- Invalid credentials
- Task CRUD operations
- Authentication middleware
- Protected routes

---

# 📊 Test Coverage

The project has automated test coverage for the main API functionality.

Current test suite:

```text
Test Suites: 3 passed
Tests:       33 passed
```

Coverage is approximately:

```text
Statements: 85%
Branches:   76%
Functions:  100%
Lines:      85%
```

---

# 🛡️ Validation and Error Handling

The API handles different validation and error scenarios, including:

- Required fields
- Invalid email format
- Duplicate emails
- Invalid IDs
- Invalid login credentials
- Missing authentication tokens
- Invalid JWT tokens
- Expired JWT tokens
- Unauthorized access
- Non-existent users
- Non-existent tasks
- Database errors
- HTTP status codes

---

# 📊 HTTP Status Codes

| Status Code | Description                                    |
| ----------- | ---------------------------------------------- |
| 200         | Request successful                             |
| 201         | Resource created successfully                  |
| 400         | Invalid request                                |
| 401         | Authentication required or invalid credentials |
| 403         | Access denied                                  |
| 404         | Resource not found                             |
| 409         | Conflict                                       |
| 500         | Internal server error                          |

---

# 🏗️ Architecture

The application follows a layered backend architecture:

```text
                    HTTP Request
                         │
                         ▼
                       Routes
                         │
                         ▼
                    Middleware
                         │
                         ▼
                    Controllers
                         │
                         ▼
                    Prisma ORM
                         │
                         ▼
                     PostgreSQL
```

### Routes

Routes define API endpoints and connect incoming requests with the appropriate controllers.

### Middleware

The authentication middleware validates JWT tokens before allowing access to protected resources.

### Controllers

Controllers contain the application logic for users, authentication and tasks.

### Prisma

Prisma ORM provides the database access layer and handles communication with PostgreSQL.

### PostgreSQL

PostgreSQL stores users, tasks and their relationships.

---

# 🗄️ Database Relationship

The project uses a one-to-many relationship between users and tasks.

```text
User
 │
 │ 1
 │
 │
 │ N
 ▼
Task
```

Each task belongs to one user, while a user can have multiple tasks.

The relationship is represented through:

```text
User
 └── tasks[]

Task
 └── userId
```

---

# 📦 NPM Scripts

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `npm run dev`           | Start development server with Nodemon |
| `npm start`             | Start production server               |
| `npm test`              | Run automated tests                   |
| `npm run test:watch`    | Run tests in watch mode               |
| `npm run test:coverage` | Generate test coverage report         |

---

# 🎯 Project Objective

This project was developed as a backend portfolio project to demonstrate practical knowledge in:

- REST API development
- Backend architecture
- Authentication and authorization
- Database design
- PostgreSQL
- Prisma ORM
- API security
- Automated testing
- API documentation
- Error handling
- Docker
- Docker Compose
- Database migrations
- Git and GitHub
- Clean project organization

---

# 📚 What I Learned

Through this project, I practiced:

- Building REST APIs with Node.js
- Working with Express.js
- Creating CRUD operations
- Connecting applications to PostgreSQL
- Using Prisma ORM
- Modeling database relationships
- Structuring controllers and routes
- Implementing authentication with JWT
- Hashing passwords with bcrypt
- Creating authentication middleware
- Protecting API resources
- Implementing user-based authorization
- Validating user input
- Handling database errors
- Working with HTTP status codes
- Writing automated API tests
- Documenting APIs with Swagger/OpenAPI
- Using environment variables
- Creating Prisma migrations
- Containerizing applications with Docker
- Managing services with Docker Compose
- Working with persistent Docker volumes
- Using Git and GitHub for version control

---

# 🚀 Future Improvements

Planned improvements for future versions include:

- Request validation with a dedicated validation library
- Pagination and filtering for tasks
- Refresh token authentication
- Role-based authorization
- Improved centralized error handling
- Database seed scripts
- CI/CD with GitHub Actions
- API deployment to a cloud platform
- Production environment configuration
- Improved test coverage
- Production Docker image optimization
- Health checks for Docker services

---

# 👨‍💻 Author

**Santiago Llano Duque**

Backend Development Junior

GitHub:

https://github.com/santyduque11/task-management-api

---

⭐ If you find this project useful, feel free to explore the source code and API documentation.
