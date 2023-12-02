const mysql = require('mysql');

/* 
for xampp default configuration:
host: 'localhost'
user: 'root'
password: ''
database: 'databasename'
*/


// connect the app to the mysql database. I used xampp as my portable mysql database.
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'nodejs-login'
});


module.exports = db;