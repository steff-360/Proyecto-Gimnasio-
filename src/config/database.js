import mysql from 'mysql2/promise';
<<<<<<< HEAD

import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestion_gimnasio',
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0
=======
export const pool = mysql.createPool({
 host: process.env.DB_HOST || '127.0.0.1',
 port: Number(process.env.DB_PORT || 3306),
 user: process.env.DB_USER || 'root',
 password: process.env.DB_PASSWORD || '',
 database: process.env.DB_NAME || 'gestion_gimnasio',
 waitForConnections: true, connectionLimit: 10, queueLimit: 0
>>>>>>> c3793d979ebac7d056cdfd7fc8317625ef7d413f
});
