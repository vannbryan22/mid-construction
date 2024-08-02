# User Task Management API

This is a RESTful API for managing users and tasks. It is built using Node.js, Express, TypeScript, and PostgreSQL. The API supports user registration, login, and CRUD operations for tasks.

## Features

- User registration and login with password hashing
- Token-based authentication using JWT
- Role-based access control for tasks
- CRUD operations for users and tasks
- Database schema management using db-migrate

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or later)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/user-task-api.git
   cd user-task-api
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Set up the PostgreSQL database**

   ```bash
   CREATE DATABASE user_task_api;
   CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE user_task_api TO your_username;
   ```

4. **Configure database connection**

   Create a database.json file in the root of your project with the following content:

   ```json
   {
     "dev": {
       "driver": "pg",
       "user": "your_username",
       "password": "your_password",
       "host": "localhost",
       "database": "user_task_api",
       "port": 5432
     }
   }
   ```

### Running the application

1. **Start the application**:

   ```bash
   yarn dev
   ```

   The server will start on port 3000 by default. You can change the port by setting the PORT environment variable.

### Creating and Running Migrations

1.  **Create new migration**:

    ```bash
    npx db-migrate create <migration-name> --sql-file
    ```

    This command will generate a new migration file in the migrations directory. Edit the generated .sql files to define your schema changes.

2.  **Run migrations**

    To apply all pending migrations, run:

    ```bash
    yarn migrate
    ```

### Sample Migration: Add fullName to Users

To add a fullName column to the users table, create a migration using the following command:

```bash
npx db-migrate create add-fullname-to-users --sql-file
```

Edit the generated add-fullname-to-users-up.sql file to add the new column:

```sql
ALTER TABLE users ADD COLUMN fullName VARCHAR(255);
```

Edit the generated add-fullname-to-users-down.sql file to remove the column:

```sql
ALTER TABLE users DROP COLUMN fullName;
```

Apply migration

```bash
npm run migrate
```

This `README.md` should help you and others understand how to set up and run your project efficiently. You can modify it to add any additional information or details specific to your implementation.
