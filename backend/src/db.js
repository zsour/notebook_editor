const mysql = require("mysql2/promise");

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "notebook",
});

module.exports = pool;
