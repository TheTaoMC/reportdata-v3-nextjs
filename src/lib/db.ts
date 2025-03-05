// lib/db.ts
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "119.59.100.53",
  user: "theoth_tww37_webreport",
  password: "oz153R8k_",
  database: "theoth_tww37_webreport",
});

export default db;
