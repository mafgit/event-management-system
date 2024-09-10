const express = require("express");
const mysql = require("mysql2"); // auth error was coming in mysql therefore used mysql2
require("dotenv").config();

const app = express();

const conn = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  //   database: "ems",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysql database");
});

// conn.query(`
//     create database ems;
//     use ems;
// `);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
