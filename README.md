# Task Management API

A RESTful API service for managing tasks with user authentication and admin capabilities.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Task Management (CRUD operations)
- Admin Dashboard
- Role-based Access Control
- Comprehensive API Documentation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Postman (for API documentation and testing)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/tasks/:id` - Delete any task (admin only)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Postman (for testing)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api
```

2. Install dependencies
```bash
npm install
```

3. Run the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Headers
Protected routes require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Sample Requests

#### Register User
```json
POST /api/auth/register
Content-Type: application/json

{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
}
```

#### Create Task
```json
POST /api/tasks
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "title": "Complete Project",
    "description": "Finish the task management API",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-01"
}
```

## Testing with Postman

1. Import the Postman collection:
   - Open Postman
   - Click "Import"
   - Select the `Task_Management_API.postman_collection.json` file

2. Set up environment variables in Postman:
   - Create a new environment
   - Add variable `token` (This will store your JWT token after login)

3. Testing Flow:
   - Register a user
   - Login to get JWT token
   - Token will be automatically set for other requests
   - Test other endpoints

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
