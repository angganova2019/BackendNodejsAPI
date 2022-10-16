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



// connect to the MySQL server
// connection.connect(function (err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }

//     let createTodos = `create table if not exists todos(
//                           id int primary key auto_increment,
//                           title varchar(255)not null,
//                           completed tinyint(1) not null default 0
//                       )`;

//     connection.query(createTodos, function (err, results, fields) {
//         if (err) {
//             console.log(err.message);
//         }
//     });

//     connection.end(function (err) {
//         if (err) {
//             return console.log(err.message);
//         }
//     });
// });

module.exports.condbmigrate = connection;