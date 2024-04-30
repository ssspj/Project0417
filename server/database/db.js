const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "jachwi.cqedpgadqcf0.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  password: "wkcnl123",
  database: "jachwi"
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = connection;
