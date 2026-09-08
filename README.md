# Task Management API

REST API for task and user management built with Node.js, Express, PostgreSQL and Prisma.

This project implements user registration, secure password hashing, JWT authentication, protected routes, task authorization, automated testing and API documentation with Swagger/OpenAPI.

The main goal of this project is to demonstrate backend development practices including RESTful API design, authentication, database relationships, validation, error handling and automated testing.

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
- Error handling
- HTTP status codes
- Environment variables
- Automated API tests
- Swagger/OpenAPI documentation
- Organized project structure

---

## 📁 Project Structure

```text
task-management-api/
│
├── prisma/
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
│   └── users.test.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── prisma.config.ts
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/santyduque11/task-management-api.git
```

### 2. Enter the project directory

```bash
cd task-management-api
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

Use `.env.example` as a reference:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_management?schema=public"

JWT_SECRET="your_secret_key"
```

Replace the database credentials with your PostgreSQL configuration.

`JWT_SECRET` is used to sign and verify JWT authentication tokens.

> ⚠️ Never upload your `.env` file, database password or JWT secret to GitHub.

---

## 🗄️ Database Setup

This project uses PostgreSQL as the relational database.

Make sure PostgreSQL is installed and running.

Create a database named:

```text
task_management
```

Then synchronize the Prisma schema with the database:

```bash
npx prisma db push
```

Generate the Prisma Client:

```bash
npx prisma generate
```

---

## ▶️ Running the API

### Development mode

Run the API with Nodemon:

```bash
npm run dev
```

### Production mode

Run the server with:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

---

## 📚 API Documentation

This project includes interactive API documentation using Swagger/OpenAPI.

After starting the server, open:

```text
http://localhost:3000/api-docs
```

Swagger allows you to:

- Explore all API endpoints
- View request parameters
- View request bodies
- Test endpoints directly from the browser
- Authenticate using JWT
- Review HTTP responses

### 🔐 Swagger Authentication

For protected endpoints:

1. Register a user using `POST /api/users`.
2. Login using `POST /api/auth/login`.
3. Copy the JWT token returned by the API.
4. Click the `Authorize` button in Swagger.
5. Enter the JWT token.
6. Execute protected endpoints.

Swagger will send the token using the appropriate authorization header.

---

## 📌 API Endpoints

### Users

| Method | Endpoint         | Authentication | Description         |
| ------ | ---------------- | -------------- | ------------------- |
| GET    | `/api/users`     | JWT            | Get all users       |
| GET    | `/api/users/:id` | JWT            | Get a user by ID    |
| POST   | `/api/users`     | Public         | Register a new user |
| PUT    | `/api/users/:id` | JWT            | Update a user       |
| DELETE | `/api/users/:id` | JWT            | Delete a user       |

### Authentication

| Method | Endpoint          | Authentication | Description                       |
| ------ | ----------------- | -------------- | --------------------------------- |
| POST   | `/api/auth/login` | Public         | Authenticate user and receive JWT |

### Tasks

All task endpoints require a valid JWT token.

| Method | Endpoint         | Authentication | Description                    |
| ------ | ---------------- | -------------- | ------------------------------ |
| GET    | `/api/tasks`     | JWT            | Get authenticated user's tasks |
| GET    | `/api/tasks/:id` | JWT            | Get a task by ID               |
| POST   | `/api/tasks`     | JWT            | Create a new task              |
| PUT    | `/api/tasks/:id` | JWT            | Update a task                  |
| DELETE | `/api/tasks/:id` | JWT            | Delete a task                  |

---

## 🔑 Authentication Flow

The authentication process follows this flow:

```text
Register
   ↓
POST /api/users
   ↓
Password hashed with bcrypt
   ↓
User stored in PostgreSQL
   ↓
Login
   ↓
POST /api/auth/login
   ↓
Credentials verified
   ↓
JWT generated
   ↓
JWT sent with protected requests
   ↓
Authentication middleware
   ↓
Controller
   ↓
Authorized resource
```

Protected requests use the following HTTP header:

```text
Authorization: Bearer YOUR_TOKEN
```

---

## 🔒 Authorization

JWT authentication is used to protect private resources.

The authentication middleware verifies:

- Presence of the token
- Valid JWT signature
- Token validity
- Token expiration

Task authorization is based on the authenticated user.

A user can only access, update or delete tasks that belong to their account.

For example, an authenticated user cannot modify another user's task.

---

## 🔐 Password Security

User passwords are never stored as plain text.

Before storing a password in the database, the API hashes it using `bcrypt`.

During login, the provided password is compared against the stored hash.

```text
Plain password
      ↓
    bcrypt
      ↓
Password hash
      ↓
PostgreSQL
```

---

## 🧪 Automated Testing

The project includes automated API tests using:

- Jest
- Supertest

Run the tests with:

```bash
npm test
```

Current test status:

```text
Test Suites: 2 passed, 2 total
Tests:       11 passed, 11 total
```

### Watch mode

Run Jest in watch mode:

```bash
npm run test:watch
```

### Test coverage

Generate a test coverage report:

```bash
npm run test:coverage
```

The tests cover authentication and user API functionality, including successful requests and error scenarios.

---

## 🛡️ Validation and Error Handling

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

## 📊 HTTP Status Codes

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

Routes define the API endpoints and connect incoming requests with the appropriate controllers.

### Middleware

The authentication middleware validates JWT tokens before allowing access to protected resources.

### Controllers

Controllers contain the application logic for users, authentication and tasks.

### Prisma

Prisma ORM provides the database access layer and handles communication with PostgreSQL.

### PostgreSQL

PostgreSQL stores users, tasks and their relationships.

---

## 🗃️ Database Relationship

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

## 📦 NPM Scripts

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `npm run dev`           | Start development server with Nodemon |
| `npm start`             | Start production server               |
| `npm test`              | Run automated tests                   |
| `npm run test:watch`    | Run tests in watch mode               |
| `npm run test:coverage` | Generate test coverage report         |

---

## 🎯 Project Objective

This project was developed as a backend portfolio project to practice and demonstrate:

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
- Clean project organization

---

## 📚 What I Learned

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
- Organizing a backend project

---

## 🚀 Future Improvements

Planned improvements for future versions include:

- Request validation with a dedicated validation library
- Pagination and filtering for tasks
- Refresh token authentication
- Role-based authorization
- Improved centralized error handling
- Database migrations and seed scripts
- Docker containerization
- CI/CD with GitHub Actions
- API deployment to a cloud platform
- Production environment configuration
- Improved test coverage

---

## 👨‍💻 Author

**Santiago Llano Duque**

Backend Development Junior

GitHub:

https://github.com/santyduque11

---

⭐ If you find this project interesting, feel free to explore the repository.
