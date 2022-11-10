const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DBNAME,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    supportBigNumbers: true
});

module.exports.condbmigrate = connection;