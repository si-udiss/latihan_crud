const mysql = require('mysql');

let conn = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "db_login_android",
    connectionLimit: 10,
});

module.exports = conn;