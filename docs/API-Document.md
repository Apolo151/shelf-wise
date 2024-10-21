
# API Documentation

## Base URL
```
http://domain/api
```

## Authentication
Some routes require authentication via JSON Web Tokens (JWT). Include the following header in requests to protected routes:
```
Authorization: Bearer <token>
```

## Endpoints

### User Endpoints

#### Register a new user
**POST** `/register`

Registers a new user.

- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  - `201 Created`
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  }
  ```
  
#### Login
**POST** `/login`

Logs in an existing user and returns a JWT.

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

---

### Book Endpoints

#### Get all books
**GET** `/books`

Retrieves a list of all available books.

- **URL**: `/books`
- **Method**: `GET`
- **Response**:
  - `200 OK`
  ```json
  [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "availableCopies": 5
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "availableCopies": 2
    }
  ]
  ```

#### Create a new book
**POST** `/books`

Creates a new book (admin only).

- **URL**: `/books`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <admin-token>`
- **Request Body**:
  ```json
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "availableCopies": 3
  }
  ```
- **Response**:
  - `201 Created`
  ```json
  {
    "id": 3,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "availableCopies": 3
  }
  ```

---

### Borrow Endpoints

#### Borrow a book
**POST** `/borrows`

Creates a new borrow entry for a book. Decreases the number of available copies of the book if it's available.

- **URL**: `/borrows`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "bookId": 2
  }
  ```
- **Response**:
  - `200 OK` (Success)
  ```json
  {
    "success": true,
    "borrowId": 1
  }
  ```

---

#### Return a borrowed book
**POST** `/borrows/return`

Marks a book as returned, updating the borrow record with a return date and increasing the available copies of the book.

- **URL**: `/borrows/return`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "bookId": 2
  }
  ```
- **Response**:
  - `200 OK` (Success)
  ```json
  {
    "success": true,
    "message": "Book returned successfully"
  }
  ```

---

#### Get borrowing history for the logged-in user
**GET** `/borrows/history`

Fetches the borrowing history for the currently logged-in user.

- **URL**: `/borrows/history`
- **Method**: `GET`
- **Response**:
  - `200 OK` (Success)
  ```json
  {
    "success": true,
    "history": [
      {
        "borrowId": 1,
        "bookId": 2,
        "borrowDate": "2024-10-21",
        "returnDate": null
      },
      {
        "borrowId": 2,
        "bookId": 3,
        "borrowDate": "2024-09-15",
        "returnDate": "2024-09-20"
      }
    ]
  }
  ```
---

### Report Endpoints

#### Get a report of borrowed books
**GET** `/reports/borrowed`

Retrieves a report of all currently borrowed books.

- **URL**: `/reports/borrowed`
- **Method**: `GET`
- **Response**:
  - `200 OK`
  ```json
    {
        "borrowedBooks": [
        {
            "title": "New Book 3",
            "author": "Author Name",
            "borrowCount": "2",
            "availableCopies": 0
        },
        {
            "title": "New Book 2",
            "author": "Author Name",
            "borrowCount": "1",
            "availableCopies": 3
        },
        ]
    }
  ```

#### Get the most popular books
**GET** `/reports/popular`

Retrieves a report of the top 10 most borrowed books.

- **URL**: `/reports/popular`
- **Method**: `GET`
- **Response**:
  - `200 OK`
  ```json
  [
    {
      "bookId": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "borrowCount": 50
    },
    {
      "bookId": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "borrowCount": 45
    }
  ]
  ```

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Error message describing what went wrong."
}
```

## Status Codes
- `200 OK`: The request was successful.
- `201 Created`: A new resource was created successfully.
- `400 Bad Request`: The request was invalid or missing parameters.
- `401 Unauthorized`: Authentication is required.
- `403 Forbidden`: The user does not have permission to access the resource.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

---

## Notes
- Authentication is required for certain routes, as indicated in the **Authentication** section.
- The `Authorization: Bearer <token>` header must be included in requests to protected routes.