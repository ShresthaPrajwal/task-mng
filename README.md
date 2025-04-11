# Node.js Express Clean Architecture API for Blys task

This is a **Node.js** application built using **Express.js** following the **Clean Architecture** principles. The application includes user authentication and task management features, with JWT-based authentication and Swagger API documentation.

---

## Features

- **User Management**:

  - Register a new user.
  - Log in with email and password.
  - JWT-based authentication.

- **Task Management**:

  - Add tasks (title and description).
  - View tasks for the authenticated user.
  - Delete tasks by ID.

- **Swagger API Documentation**:
  - Interactive API documentation available at `/api-docs`.

---

## Prerequisites

- **Node.js**: v14 or later
- **npm**: v6 or later
- **MySQL**: Ensure a MySQL database is running.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nodejs-express-clean-architecture
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Environment file setup:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=clean_architecture
   JWT_SECRET=your_jwt_secret
   ```

4. Run app:

   ```bash


    npm run dev


   ```
