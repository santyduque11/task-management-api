# Task Management API

REST API for managing users and tasks, built with Node.js, Express, PostgreSQL and Prisma.

The project includes user registration, authentication with JWT and task management with user-based authorization.

## 🚀 Technologies

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JavaScript
- bcrypt
- JSON Web Token (JWT)
- Thunder Client

## 📁 Project Structure

```text
task-management-api/

├── prisma/
│   └── schema.prisma
├── src/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   └── auth.routes.js
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── tasks.controller.js
│   │   └── users.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── tasks.routes.js
│   │   └── users.routes.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── prisma.config.ts
```

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

## 🔐 Environment Variables

Create a `.env` file in the project root.

Use `.env.example` as a reference:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_management?schema=public"
JWT_SECRET="your_secret_key"
```

Replace the database credentials with your PostgreSQL configuration.

`JWT_SECRET` is used to sign and verify authentication tokens.

> ⚠️ Never upload your `.env` file or your database password and JWT secret to GitHub.

## 🗄️ Database Setup

This project uses PostgreSQL as its database.

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

## ▶️ Run the API

Start the server with:

```bash
node src/app.js
```

The API will be available at:

```text
http://localhost:3000
```

## 📌 API Endpoints

### Users

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/users`     | Get all users     |
| GET    | `/api/users/:id` | Get a user by ID  |
| POST   | `/api/users`     | Create a new user |
| PUT    | `/api/users/:id` | Update a user     |
| DELETE | `/api/users/:id` | Delete a user     |

### Authentication

| Method | Endpoint          | Description                   |
| ------ | ----------------- | ----------------------------- |
| POST   | `/api/auth/login` | Login and receive a JWT token |

### Tasks

All task endpoints require a valid JWT token.

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | `/api/tasks`     | Get the authenticated user's tasks |
| GET    | `/api/tasks/:id` | Get a task by ID                   |
| POST   | `/api/tasks`     | Create a new task                  |
| PUT    | `/api/tasks/:id` | Update a task                      |
| DELETE | `/api/tasks/:id` | Delete a task                      |

For protected endpoints, send the token using the `Authorization` header:

```text
Authorization: Bearer YOUR_TOKEN
```

## 🔐 Authentication and Authorization

The API uses JWT for user authentication.

When a user logs in successfully, the API generates a token that must be sent when accessing the task endpoints.

Passwords are hashed using bcrypt before being stored in the database.

Task authorization is based on the authenticated user. A user can only access, update or delete tasks that belong to their account.

For example, an authenticated user cannot access or modify a task that belongs to another user.

## 🧪 API Testing

The API was tested using Thunder Client.

The project includes validation and error handling for:

- Required fields
- Email format
- Duplicate emails
- Invalid IDs
- Invalid login credentials
- Missing authentication tokens
- Invalid or expired tokens
- Unauthorized access to tasks
- Non-existent users and tasks
- Database errors
- HTTP status codes

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

## 🏗️ Architecture

The project follows a simple layered structure:

```text
Request
   ↓
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Prisma ORM
   ↓
PostgreSQL
```

### Routes

The routes define the available API endpoints and connect them with the corresponding controllers.

### Middleware

The authentication middleware verifies the JWT token before allowing access to protected task endpoints.

### Controllers

The controllers contain the application logic for users, authentication and tasks.

### Prisma

Prisma ORM is used to communicate with the PostgreSQL database.

### PostgreSQL

PostgreSQL stores the application data and relationships between users and tasks.

## 🎯 Project Features

- RESTful API
- User CRUD operations
- Task CRUD operations
- PostgreSQL database integration
- Prisma ORM
- User-task relationship
- User registration
- Password hashing with bcrypt
- JWT authentication
- Authentication middleware
- Task authorization
- Input validation
- Email format validation
- Duplicate email handling
- Error handling
- HTTP status codes
- Environment variables
- Organized project structure
- API testing with Thunder Client

## 📚 What I Learned

Through this project, I practiced:

- Building REST APIs with Node.js
- Working with Express.js
- Creating CRUD operations
- Connecting an API to PostgreSQL
- Using Prisma ORM
- Working with database relationships
- Structuring controllers and routes
- Validating user input
- Hashing passwords with bcrypt
- Implementing JWT authentication
- Creating authentication middleware
- Controlling access to user-owned resources
- Handling database errors
- Working with HTTP status codes
- Using environment variables
- Testing APIs with Thunder Client

## 🚀 Future Improvements

Some improvements I plan to add in future versions include:

- Request validation with a validation library
- Automated tests
- API documentation with Swagger/OpenAPI
- Pagination and filtering for tasks
- Docker support
- Deployment to a cloud platform
- Improved error handling
- Refresh tokens

## 👨‍💻 Author

**Santiago Llano Duque**

Backend Development Junior

---

⭐ If you find this project interesting, feel free to explore the repository.
