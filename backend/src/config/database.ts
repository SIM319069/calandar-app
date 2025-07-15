// backend/src/config/database.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Debug: log environment variables
console.log("🔍 Database Configuration:");
console.log("HOST:", process.env.DB_HOST || "localhost");
console.log("PORT:", process.env.DB_PORT || "5432");
console.log("DATABASE:", process.env.DB_NAME || "postgres");
console.log("USER:", process.env.DB_USER || "postgres");
console.log("NODE_ENV:", process.env.NODE_ENV);

// Explicit configuration (easier to see and debug)
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

console.log("📊 Pool Configuration:", {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  ssl: dbConfig.ssl,
});

const pool = new Pool(dbConfig);

// Test connection and show helpful info
pool.on("connect", (client) => {
  console.log("✅ Connected to PostgreSQL database");
  console.log(`🏠 Host: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`🗄️ Database: ${dbConfig.database}`);
  console.log(`👤 User: ${dbConfig.user}`);
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
  console.log("🔧 Connection details for debugging:");
  console.log(`   Host: ${dbConfig.host}`);
  console.log(`   Port: ${dbConfig.port}`);
  console.log(`   Database: ${dbConfig.database}`);
  console.log(`   User: ${dbConfig.user}`);
});

// Add a helper function to test the connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT NOW() as current_time, version() as pg_version"
    );
    console.log("🕐 Database Time:", result.rows[0].current_time);
    console.log("🐘 PostgreSQL Version:", result.rows[0].pg_version);
    client.release();
    return true;
  } catch (err) {
    console.error("❌ Connection test failed:", err);
    return false;
  }
};

// Add helper function to show all events (for debugging)
export const showAllEvents = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM events ORDER BY start_date DESC"
    );
    console.log("📅 Current Events in Database:");
    console.table(result.rows);
    client.release();
    return result.rows;
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    return [];
  }
};

export default pool;
