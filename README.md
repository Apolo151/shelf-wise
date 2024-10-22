# ShelfWise

ShelfWise is a library management system designed to streamline the process of managing books, users, borrowing records, and generating reports such as popular books. It provides features for user registration, book borrowing, and administration functionalities.

> You can access the deployed API swagger page [here](https://shelf-wise-atiex.ondigitalocean.app/api/)

## Table of Contents
- [Features](#features)
- [File Structure](#file-structure)
- [Setup Steps](#setup-steps)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)

----
- [API Documentation](docs/API-Document.md)
- [Database Schema](docs/ERD.md)
- [Sequence Diagrams](docs/SequenceDiagram.md)
## Features

- **User Management**: Users can register, log in, and perform various actions like borrowing books.
- **Book Management**: Admins can manage books (add, update, delete).
- **Borrowing System**: Tracks which users borrowed which books and their borrowing history.
- **Reports**: Admins can view reports of popular books based on borrowing history.
- **JWT Authentication**: Secure API with JWT-based authentication for protected endpoints.
- **Role-based Authorization**: Different roles (admin, user) with access control.
- **PostgreSQL Database**: Utilizes PostgreSQL for data storage.
- **RESTful API**: Built with Node.js, Express, and Knex for database interactions.
- **Migrations**: Easy database setup with Knex.
- **Unit Testing**: Unit tests for API endpoints.

## File Structure

```bash
├── db                      # database stuff
│   ├── migrations
│   └── seeds
├── docker-compose.yml
├── Dockerfile
├── docs                    # documentation and diagrams
│   ├── ERD.md
│   └── SequenceDiagram.md
├── docs                    # scripts used for automating functionalities
├── jest.config.js
├── sequelize.config.js     # Sequelize Config
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── database.ts       # Database init
│   ├── controllers/      # Contains API controller logic
│   ├── middlewares/      # Middleware (authentication, error handling, etc.)
│   ├── models/           # Sequelize models (User, Book, Borrow, etc.)
│   ├── routes/           # API route definitions
│   ├── utils/            # Utility functions and helpers
│   ├── server.ts
├── tests                 # Unit Tests
└── tsconfig.json
```

## Setup Steps

> Make sure to use **Node.js v20.13.1** for this project.
- using [nvm](https://github.com/nvm-sh/nvm) is recommended to manage multiple node versions

### Prerequisites

- Node.js v20.13.1
- Docker & Docker Compose (optional, for running the database in a container)
- PostgreSQL (if not using Docker)

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shelf-wise.git
cd shelf-wise
```

### Local Setup

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Setup Environment Variables

Create a `.env` file at the root of the project and set the necessary environment variables. Here's an example `.env` file:

```
DATABASE_URI=postgres://yourusername:yourpassword@localhost:5432/shelfwise
JWT_SECRET=your_jwt_secret
PORT=3000
```

#### 4. Run Migrations

- run database seeds and migrations

```bash
npm run migrate
npm run seed
```

#### 5. Start the Application

You can start the application using the following command:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

#### 6. Running Tests

Run the unit tests to ensure everything is working correctly:

```bash
npm run test
```

### Docker Setup

If you're using Docker with a database container, ensure your `docker-compose.yml` is set up correctly and start the services:

```bash
docker-compose up -d
```

- Access the API at `http://localhost:3000`.

---