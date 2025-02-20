# Postman Testing Guide for CRUD API
This document provides a step-by-step guide to test the API endpoints defined in `routes/user-router.js` using Postman.

## Prerequisites
- Signed in Postman
- A running backend API (Example: server.js with MongoDB)

---
  
### **Testing Steps in Postman**
- **Create a New Collection**:
Create a new collection in Postman for your CRUD API.
- **Add Requests**:
Add requests for each endpoint (`POST /create`, `GET /`, `GET /:id`, `PUT /update/:id`, `DELETE /delete/:id`) to the collection.
- **Set Headers**:
For requests requiring a body (`POST`, `PUT`), set the `Content-Type` header to `application/json`.
- **Send Requests**:
Test each endpoint by sending requests and verify the responses.

### Base URL `http://localhost:3030`

## Endpoints and Test Cases
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/api/users/create` | Add a new user      |
| POST   | `/api/users/createMany` | Add multiple users |
| GET    | `/api/users/`       | Get all users       |
| GET    | `/api/users/:id`    | Get a user by ID    |
| PUT    | `/api/users/update/:id` | Update user by ID |
| DELETE | `/api/users/delete/:id` | Delete user by ID |

### **1. Create a New User**
- **Method**: `POST`
- **Endpoint**: `/api/users/create`
- **Description**: Add a new user to the database.
- **Set Headers**:
Set the `Content-Type` header to `application/json`.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "imgUrl": "https://example.com/image.jpg"
  }
  ```
- **Expected Response**: `Response Code: 201 Created`
  ```json
  {
    "_id": "63d67b54198e3c1a3d6b8c92",
    "name": "John Doe",
    "age": 30,
    "imgUrl": "https://example.com/image.jpg",
    "createdAt": "2025-01-21T12:00:00.000Z",
    "__v": 0
  }
  ```

### **2. Create Multiple Users**
- **Method**: `POST`
- **Endpoint**: `/api/users/createMany`
- **Description**: Add multiple users to the database.
- **Set Headers**:
Set the `Content-Type` header to `application/json`.
- **Request Body**:
  ```json
  [
    {
      "name": "John Doe",
      "age": 12,
      "imgUrl": "https://abc.pqr.xyz/image.jpg"
    },
    {
      "name": "Jane Doe",
      "age": 14,
      "imgUrl": "https://abc.pqr.xyz/image.jpg"
    }
  ]
  ```
- **Expected Response**: `Response Code: 201 Created`
  ```json
  [
    {
      "_id": "63d67b54198e3c1a3d6b8c92",
      "name": "John Doe",
      "age": 12,
      "imgUrl": "https://abc.pqr.xyz.image/jpg",
      "createdAt": "2025-01-21T12:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "63d67b54198e3c1a3d6b8c97",
      "name": "Jane Doe",
      "age": 14,
      "imgUrl": "https://abc.pqr.xyz.image/jpg"
      "createdAt": "2025-01-21T12:00:00.000Z",
      "__v": 0
    }
  ]

  ```
  
### **3. Get All Users**
- **Method**: `GET`
- **Endpoint**: `/api/users/`
- **Description**: Fetch all users from the database.
- **Expected Response**:
  `Response Code: 200 Ok`
  ```json
  [
    {
      "_id": "63d67b54198e3c1a3d6b8c92",
      "name": "John Doe",
      "age": 30,
      "imgUrl": "https://example.com/image.jpg",
      "createdAt": "2025-01-21T12:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "63d67b54198e3c1a3d6b8c97",
      "name": "Jane Doe",
      "age": 14,
      "imgUrl": "https://abc.pqr.xyz.image/jpg"
      "createdAt": "2025-01-21T12:00:00.000Z",
      "__v": 0
    }
  ]
  ```
  
### **4. Get a User by ID**
- **Method**: `GET`
- **Endpoint**: `/api/users/:id`
- **Description**: Fetch a single user by their ID.
- **URL Parameter**: id (MongoDB ObjectId)
- **Example**: `/api/users/63d67b54198e3c1a3d6b8c92`
- **Expected Response**:
  `Response Code: 200 OK`
  ```json
  {
    "_id": "63d67b54198e3c1a3d6b8c92",
    "name": "John Doe",
    "age": 30,
    "imgUrl": "https://example.com/image.jpg",
    "createdAt": "2025-01-21T12:00:00.000Z",
    "__v": 0
  }
  ```

### **5. Update a User by ID**
- **Method**: `PUT`
- **Endpoint**: `/api/users/update/:id`
- **Description**: Update an existing user's details.
- **URL Parameter**: id (MongoDB ObjectId)
- **Example**: `/api/users/63d67b54198e3c1a3d6b8c92`
- **Set Headers**:
Set the `Content-Type` header to `application/json`.
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "age": 28
  }
  ```
- **Expected Response**:
  `Response Code: 200 OK`
  ```json
  {
    "_id": "63d67b54198e3c1a3d6b8c92",
    "name": "Jane Doe",
    "age": 28,
    "imgUrl": "https://example.com/image.jpg",
    "createdAt": "2025-01-21T12:00:00.000Z",
    "__v": 0
  }
  ```

### **6. Delete a User by ID**
- **Method**: `DELETE`
- **Endpoint**: `/api/users/delete/:id`
- **Description**: Remove a user from the database.
- **URL Parameter**: id (MongoDB ObjectId)
- **Example**: `/api/users/63d67b54198e3c1a3d6b8c92`
- **Expected Response**:
  `Response Code: 200 OK`
  ```json
  {
    "_id": "63d67b54198e3c1a3d6b8c92",
    "name": "John Doe",
    "age": 30,
    "imgUrl": "https://example.com/image.jpg",
    "createdAt": "2025-01-21T12:00:00.000Z",
    "__v": 0
  }
  ```

#### Notes
- Make sure MongoDB is running on `mongodb://127.0.0.1:27017/`.
- Verify that your server is running on `http://localhost:3030`.
- Replace `id` in `GET /:id`, `PUT /update/:id`, and `DELETE /delete/:id` with a valid MongoDB ObjectId.
