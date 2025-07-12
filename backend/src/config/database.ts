// backend/src/config/database.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Debug: log environment variables
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/postgres",
  // Alternative explicit configuration:
  // user: 'postgres',
  // password: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // database: 'postgres',
});

// Test connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

export default pool;
