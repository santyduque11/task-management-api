# Task Management API

REST API for task and user management built with **Node.js, Express, PostgreSQL and Prisma**.

This project implements user registration, secure password hashing, JWT authentication, role-based authorization, protected routes, task ownership validation, input validation, pagination and filtering, centralized error handling, automated testing, code coverage, Swagger/OpenAPI documentation, Docker containerization, Docker Compose and continuous integration with GitHub Actions.

The main goal of this project is to demonstrate practical backend development skills and software engineering practices used in real-world API development.

---

## 🚀 Technologies

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JavaScript
- Zod
- bcrypt
- JSON Web Token (JWT)
- Swagger / OpenAPI
- Jest
- Supertest
- Winston
- Helmet
- CORS
- express-rate-limit
- ESLint
- Prettier
- Docker
- Docker Compose
- GitHub Actions
- Git / GitHub

---

## 📋 Features

### Authentication & Authorization

- User registration
- JWT authentication
- Secure password hashing with bcrypt
- Protected routes
- Authentication middleware
- Role-based authorization
- User roles: `USER` and `ADMIN`
- Invalid credential handling
- Invalid and expired JWT handling
- Task ownership authorization

### Users

- Create users
- Retrieve users
- Retrieve users by ID
- Update users
- Delete users
- Email uniqueness validation
- Duplicate email handling
- Password protection

### Tasks

- Create tasks
- Retrieve authenticated user's tasks
- Retrieve tasks by ID
- Update tasks
- Delete tasks
- Task ownership validation
- Pagination
- Filtering by completion status

### Validation & Error Handling

- Request validation with Zod
- Email format validation
- Required field validation
- ID validation
- Centralized error handling
- Prisma database error handling
- HTTP status code management
- Structured API error responses

### Security

- Helmet security headers
- CORS configuration
- Rate limiting
- JWT authentication
- Password hashing
- Protected resources
- Environment variables for sensitive configuration
- Input validation
- Password data excluded from API responses

### Development & Quality

- Automated API testing
- Jest and Supertest
- Code coverage
- ESLint
- Prettier
- Swagger/OpenAPI documentation
- Prisma migrations
- Database seed script
- GitHub Actions CI
- Docker containerization
- Docker Compose
- PostgreSQL health checks

---

## 🏗️ Architecture

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

Routes define the API endpoints and connect incoming requests with the appropriate middleware and controllers.

### Middleware

Middleware handles cross-cutting concerns such as:

- JWT authentication
- Request validation
- Role authorization
- Error handling
- Rate limiting
- Security headers

### Controllers

Controllers contain the application logic for:

- Users
- Authentication
- Tasks

### Prisma

Prisma provides the database access layer and manages communication between the application and PostgreSQL.

### PostgreSQL

PostgreSQL stores users, tasks and their relationships.

---

## 📁 Project Structure

```text
task-management-api/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── prisma/
│   ├── migrations/
│   │   ├── 20260908161832_init/
│   │   └── 20260908231621_add_user_roles/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   └── auth.routes.js
│   │
│   ├── config/
│   │   ├── env.js
│   │   ├── logger.js
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │   ├── tasks.controller.js
│   │   └── users.controller.js
│   │
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.js
│   │   ├── requireRole.js
│   │   └── validation.middleware.js
│   │
│   ├── routes/
│   │   ├── tasks.routes.js
│   │   └── users.routes.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── pagination.validator.js
│   │   ├── task-filter.validator.js
│   │   ├── task.validator.js
│   │   └── user.validator.js
│   │
│   ├── app.js
│   ├── server.js
│   └── swagger.js
│
├── tests/
│   ├── auth.test.js
│   ├── auth.middleware.test.js
│   ├── errorHandler.test.js
│   ├── health.test.js
│   ├── requireRole.test.js
│   ├── tasks.test.js
│   └── users.test.js
│
├── .dockerignore
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
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
JWT_SECRET="your-secret-key-with-at-least-32-characters"
PORT=3000
```

The application validates environment variables using Zod.

Required variables:

| Variable       | Description                           |
| -------------- | ------------------------------------- |
| `DATABASE_URL` | PostgreSQL database connection string |
| `JWT_SECRET`   | Secret used to sign JWT tokens        |
| `PORT`         | API port                              |

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

## 7. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

# 🐳 Running with Docker

Docker Compose provides a complete development environment containing:

- Node.js API
- PostgreSQL database
- Prisma ORM
- Docker networking
- Persistent PostgreSQL storage
- PostgreSQL health checks

## 1. Build and start the containers

```bash
docker compose up -d --build
```

The API depends on PostgreSQL being healthy before starting.

## 2. Check container status

```bash
docker compose ps
```

Expected services:

```text
task-management-api
task-management-db
```

The PostgreSQL container should report:

```text
healthy
```

## 3. API

The API is available at:

```text
http://localhost:3000
```

## 4. Health Check

```text
GET /health
```

Example response:

```json
{
  "status": "ok",
  "message": "Task Management API is running"
}
```

## 5. PostgreSQL

PostgreSQL is exposed locally on:

```text
localhost:5433
```

Inside the Docker network, the API connects to PostgreSQL through:

```text
postgres:5432
```

## 6. Apply database migrations

```bash
docker compose exec api npx prisma migrate deploy
```

## 7. View API logs

```bash
docker compose logs api
```

## 8. Stop the containers

```bash
docker compose down
```

PostgreSQL data is stored in a persistent Docker volume.

The volume allows database data to persist when the containers are stopped.

---

# ❤️ Health Check

The API exposes a health endpoint:

```text
GET /health
```

Example:

```json
{
  "status": "ok",
  "message": "Task Management API is running"
}
```

This endpoint can be used to verify that the API is running correctly.

The endpoint was also verified against the Dockerized API during the final project validation.

---

# 📚 API Documentation

The project includes interactive API documentation using Swagger/OpenAPI.

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

The JWT contains information about the authenticated user, including:

- User ID
- Email
- Role

Swagger provides an `Authorize` button for authenticated requests.

---

# 👤 Users API

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| POST   | `/api/users`     | No             |
| GET    | `/api/users`     | Yes            |
| GET    | `/api/users/:id` | Yes            |
| PUT    | `/api/users/:id` | Yes            |
| DELETE | `/api/users/:id` | Yes            |

### Register User

```text
POST /api/users
```

Example request:

```json
{
  "name": "Santiago",
  "email": "santiago@example.com",
  "password": "Password123"
}
```

---

# 🔑 Authentication API

| Method | Endpoint          | Authentication |
| ------ | ----------------- | -------------- |
| POST   | `/api/auth/login` | No             |

### Login

```text
POST /api/auth/login
```

Example request:

```json
{
  "email": "santiago@example.com",
  "password": "Password123"
}
```

Successful authentication returns a JWT token.

---

# 📋 Tasks API

| Method | Endpoint         | Authentication |
| ------ | ---------------- | -------------- |
| GET    | `/api/tasks`     | Yes            |
| GET    | `/api/tasks/:id` | Yes            |
| POST   | `/api/tasks`     | Yes            |
| PUT    | `/api/tasks/:id` | Yes            |
| DELETE | `/api/tasks/:id` | Yes            |

Tasks are associated with authenticated users.

A user can only access, modify or delete tasks that belong to that user.

---

## Pagination and Filtering

The tasks endpoint supports pagination and filtering.

Example:

```text
GET /api/tasks?page=1&limit=10
```

Filter completed tasks:

```text
GET /api/tasks?completed=true
```

The response includes pagination information:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

---

# 🧪 Testing

The project uses **Jest** and **Supertest** for automated API testing.

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

The test suite covers:

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
- Authentication middleware
- Role authorization
- Protected routes
- Task CRUD operations
- Task ownership authorization
- Pagination
- Task filtering
- Health check
- Error handling

### Current Test Results

```text
Test Suites: 7 passed, 7 total
Tests:       60 passed, 60 total
Snapshots:   0 total
```

---

# 📊 Code Coverage

The project maintains automated code coverage using Jest.

Current verified coverage:

```text
Statements: 99.23%
Branches:   88.67%
Functions:  100%
Lines:      99.23%
```

Run:

```bash
npm run test:coverage
```

The generated report is available in:

```text
coverage/
```

The project intentionally does not pursue artificial 100% coverage when doing so would only add tests without meaningful value.

---

# 🔄 Continuous Integration

The project uses **GitHub Actions** for continuous integration.

The CI workflow performs automated validation when changes are pushed or submitted through pull requests.

The workflow includes:

```text
GitHub Push / Pull Request
          │
          ▼
     GitHub Actions
          │
          ▼
    Setup Node.js
          │
          ▼
      PostgreSQL
          │
          ▼
  Prisma Migrations
          │
          ▼
       Test Seed
          │
          ▼
      Jest Tests
```

Workflow file:

```text
.github/workflows/ci.yml
```

The CI environment uses PostgreSQL and executes database migrations and automated tests.

---

# 🛡️ Security

The API implements several security practices:

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Role-based authorization
- Helmet security headers
- CORS configuration
- Rate limiting
- Environment variables for sensitive configuration
- Input validation with Zod
- Centralized error handling
- Database error handling
- Password data excluded from API responses
- Automated security-related tests

---

# ⚠️ Dependency Audit

The project was reviewed using `npm audit`.

At the current dependency versions, `npm audit` reports:

```text
4 high severity vulnerabilities
```

The reported issues are associated with transitive dependencies in the Prisma dependency tree, including:

- `deepmerge-ts`
- `mysql2`

The available automatic fix requires:

```text
npm audit fix --force
```

However, the forced fix would perform a breaking Prisma version change to `prisma@6.19.3`.

The project therefore does **not** use `npm audit fix --force`, since the current application is running successfully on Prisma 7 and forcing a major dependency downgrade could introduce breaking changes.

The dependency audit finding is documented and should be reassessed when a compatible stable update becomes available.

---

# 🧩 Validation and Error Handling

Request validation is implemented using **Zod**.

The API validates:

- Required fields
- Email format
- Password requirements
- Task fields
- User fields
- Pagination parameters
- Task filters
- Resource IDs

The centralized error handler manages application and database errors.

---

# 📊 HTTP Status Codes

| Status Code | Description                                    |
| ----------- | ---------------------------------------------- |
| 200         | Request successful                             |
| 201         | Resource created successfully                  |
| 400         | Invalid request or validation error            |
| 401         | Authentication required or invalid credentials |
| 403         | Access denied                                  |
| 404         | Resource not found                             |
| 409         | Resource conflict                              |
| 429         | Too many requests                              |
| 500         | Internal server error                          |

---

# 🗄️ Database Model

The application uses PostgreSQL with Prisma ORM.

Main entities:

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

A user can have multiple tasks, while each task belongs to one user.

### User

```text
User
├── id
├── name
├── email
├── password
├── role
└── tasks[]
```

### Task

```text
Task
├── id
├── title
├── description
├── completed
├── createdAt
├── updatedAt
├── userId
└── user
```

The relationship uses a foreign key:

```text
Task.userId → User.id
```

Tasks are configured with cascading deletion when their associated user is deleted.

---

# 📦 Prisma Migrations

Database changes are managed using Prisma migrations.

Current migrations include:

```text
20260908161832_init
20260908231621_add_user_roles
```

Apply migrations:

```bash
npx prisma migrate deploy
```

Create a development migration:

```bash
npx prisma migrate dev --name migration_name
```

---

# 🧹 Code Quality

The project uses **ESLint** and **Prettier** to maintain consistent and reliable code.

Run ESLint:

```bash
npm run lint
```

Format the project:

```bash
npm run format
```

Check formatting without modifying files:

```bash
npm run format:check
```

The current project passes the configured ESLint and Prettier checks.

---

# 📦 NPM Scripts

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `npm run dev`           | Start development server with Nodemon |
| `npm start`             | Start production server               |
| `npm test`              | Run automated tests                   |
| `npm run test:watch`    | Run tests in watch mode               |
| `npm run test:coverage` | Generate code coverage                |
| `npm run lint`          | Run ESLint                            |
| `npm run format`        | Format project with Prettier          |
| `npm run format:check`  | Check Prettier formatting             |

---

# 🎯 Project Objective

This project was developed as a backend portfolio project to demonstrate practical knowledge in:

- REST API development
- Backend architecture
- Authentication and authorization
- JWT
- PostgreSQL
- Prisma ORM
- Relational database modeling
- API security
- Input validation
- Automated testing
- Code coverage
- API documentation
- Error handling
- Docker
- Docker Compose
- Continuous integration
- Code quality
- Git and GitHub

The project is designed to demonstrate not only the ability to create endpoints, but also the ability to structure, test, validate, secure and maintain a backend application.

---

# 📚 What I Learned

Through this project, I practiced:

- Building REST APIs with Node.js and Express
- Designing backend application architecture
- Creating CRUD operations
- Connecting applications to PostgreSQL
- Using Prisma ORM
- Modeling relational databases
- Creating database migrations
- Implementing JWT authentication
- Hashing passwords with bcrypt
- Creating authentication middleware
- Implementing authorization rules
- Protecting user-owned resources
- Validating requests with Zod
- Handling database errors
- Implementing centralized error handling
- Writing automated API tests
- Measuring code coverage
- Documenting APIs with Swagger/OpenAPI
- Implementing API security practices
- Using Docker and Docker Compose
- Configuring PostgreSQL health checks
- Creating CI workflows with GitHub Actions
- Maintaining code quality with ESLint and Prettier
- Using Git and GitHub for version control

---

# 🚀 Future Improvements

Possible future improvements include:

- Refresh token authentication
- More advanced role and permission management
- Additional integration and performance tests
- Docker image optimization
- Monitoring and observability improvements
- Further production infrastructure improvements

These items are outside the current scope of the completed project.

---

# 👨‍💻 Author

## Santiago Llano Duque

**Backend Development Junior**

GitHub:

https://github.com/santyduque11/task-management-api

---

⭐ If you find this project useful, feel free to explore the source code and API documentation.
