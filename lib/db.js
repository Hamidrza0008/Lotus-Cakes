import mysql from "mysql2/promise";

// Next.js hot reload me multiple DB connections banne se bachane ke liye
let pool;

if (!global.pool) {
  global.pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    waitForConnections: true,
    connectionLimit: 2, // Free hosting ke liye best
    queueLimit: 0,
  });
}

pool = global.pool;

export { pool as db };