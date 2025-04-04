# API Specifications

## Authentication Endpoints

### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "token": "string"
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Error (401):**
    ```json
    {
      "message": "Invalid password"
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

## User Management Endpoints

### Create User
- **URL:** `/api/users`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "roles": ["string"]
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "username": "string",
      "roles": ["string"]
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Get All Users
- **URL:** `/api/users`
- **Method:** `GET`
- **Response:**
  - **Success (200):**
    ```json
    [
      {
        "username": "string",
        "roles": ["string"]
      }
    ]
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Get User by ID
- **URL:** `/api/users/:id`
- **Method:** `GET`
- **Response:**
  - **Success (200):**
    ```json
    {
      "username": "string",
      "roles": ["string"]
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Update User
- **URL:** `/api/users/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "roles": ["string"]
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "username": "string",
      "roles": ["string"]
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Delete User
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Assign Roles to User
- **URL:** `/api/users/:id/roles`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "roles": ["string"]
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "username": "string",
      "roles": ["string"]
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User not found"
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

## Role Management Endpoints

### Create Role
- **URL:** `/api/roles`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "string",
    "permissions": ["string"]
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "name": "string",
      "permissions": ["string"]
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Get All Roles
- **URL:** `/api/roles`
- **Method:** `GET`
- **Response:**
  - **Success (200):**
    ```json
    [
      {
        "name": "string",
        "permissions": ["string"]
      }
    ]
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Assign Permissions to Role
- **URL:** `/api/roles/:roleId/permissions`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "permissions": ["string"]
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "name": "string",
      "permissions": ["string"]
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "Role not found"
    }
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```

### Get All Permissions
- **URL:** `/api/permissions`
- **Method:** `GET`
- **Response:**
  - **Success (200):**
    ```json
    [
      {
        "name": "string"
      }
    ]
    ```
  - **Error (500):**
    ```json
    {
      "message": "Internal server error",
      "error": "string"
    }
    ```
