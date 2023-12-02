require('dotenv').config();
/* 
alternative way to configure .env file in your nodejs project
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
*/
const path = require('path');
const express = require("express");
const mysql = require('mysql');
const port = process.env.PORT || 4000;
const publicDirectory = path.join(__dirname, './public');


// create app by using express 
app = express();
// to read the json data: parse json bodies as sent by API clients
app.use(express.json());
// to read the submitted form data (Parse url-encoded bodies sent by HTML form);
app.use(express.urlencoded({ extended: false }));


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


// set up view engine for this app 
/* 
app.set('view engine', 'hbs');
Using hbs as the default view engine requires just one line of code in your app setup. 
This will render .hbs files when res.render is called.
*/


// enable express to use your static files from your folder where you created those files
app.use(express.static(publicDirectory));
// default view engine settings
app.set('view engine', 'hbs');


db.connect( (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Database connected successfully 🥰");
    }
});


// pages routes e.g. index page, registration page etc
app.use('/', require('./routes/pagesRoutes.js'));


// registration form submit route
app.use("/auth", require("./routes/authRoutes.js"))


// start the app: use app.listen(PORT, callbackFunction);
app.listen(port, () => {
    console.log(`The server is running on http://127.0.0.1:${port}`);
});