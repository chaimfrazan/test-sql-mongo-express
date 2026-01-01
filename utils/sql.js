import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function initSqlDb() {
  let connTemp = null;
  try {
    connTemp = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });
    console.log("connected to sql");
    await connTemp.query(`create database if not exists message;`);
    await connTemp.query(`use message;`);
    await connTemp.query(`  CREATE TABLE IF NOT EXISTS message (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(24) NOT NULL,
        cipher_type VARCHAR(24) NOT NULL,
        encrypted_text VARCHAR(255) NOT NULL,
        inserted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);
  } catch (error) {
    console.log(error.message);
  } finally {
    connTemp.end();
  }
}

let connection = null;
export async function getMysqlConnection() {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    database: "message"
  });
  return connection;
}
