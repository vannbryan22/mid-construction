import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mid",
  password: "pass1234",
  port: 5432,
});

export const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'To Do',
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  } finally {
    client.release();
  }
};

export default pool;
