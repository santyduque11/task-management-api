# Task Management API

REST API for managing users and tasks, built with Node.js, Express, PostgreSQL and Prisma.

## 🚀 Technologies

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JavaScript
- Thunder Client

## 📁 Project Structure

```text
task-management-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   └── users.controller.js
│   ├── routes/
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
git clone YOUR_REPOSITORY_URL
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
```

Replace `USER` and `PASSWORD` with your PostgreSQL credentials.

> ⚠️ Never upload your `.env` file or your database password to GitHub.

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

## 🧪 API Testing

The API endpoints were tested using Thunder Client.

The API includes validation and error handling for:

- Required fields
- Email format
- Duplicate emails
- Invalid IDs
- Non-existent users
- Database errors
- HTTP status codes

## 📊 HTTP Status Codes

| Status Code | Description                   |
| ----------- | ----------------------------- |
| 200         | Request successful            |
| 201         | Resource created successfully |
| 400         | Invalid request               |
| 404         | Resource not found            |
| 409         | Conflict                      |
| 500         | Internal server error         |

## 🏗️ Architecture

The project follows a basic layered structure:

```text
Request
   ↓
Routes
   ↓
Controllers
   ↓
Prisma ORM
   ↓
PostgreSQL
```

### Routes

The routes define the available API endpoints and connect them with the corresponding controllers.

### Controllers

The controllers contain the business logic for creating, retrieving, updating and deleting users.

### Prisma

Prisma ORM is used to communicate with the PostgreSQL database.

### PostgreSQL

PostgreSQL stores the application data.

## 🎯 Project Features

- RESTful API
- CRUD operations
- PostgreSQL database integration
- Prisma ORM
- Express.js
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
- Structuring controllers and routes
- Validating user input
- Handling database errors
- Working with HTTP status codes
- Using environment variables
- Testing APIs

## 🚀 Future Improvements

Planned improvements for the project include:

- User authentication with JWT
- Password encryption
- Task management
- User-task relationships
- Middleware
- Request validation with a validation library
- Automated tests
- API documentation with Swagger
- Docker support
- Deployment to a cloud platform

## 👨‍💻 Author

**Santiago Llano Duque**

Backend Development Portfolio

---

⭐ If you find this project interesting, feel free to explore the repository.
