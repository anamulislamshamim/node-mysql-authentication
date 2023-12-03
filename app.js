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
const db = require('./config/dbConnection.js');
const { Socket } = require('socket.io');
const { dashboardCtrl } = require('./controllers/authController.js');


// create app by using express 
app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server);
// to read the json data: parse json bodies as sent by API clients
app.use(express.json());
// to read the submitted form data (Parse url-encoded bodies sent by HTML form);
app.use(express.urlencoded({ extended: false }));


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


// connect the database to this app
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
app.use("/auth", require("./routes/authRoutes.js"));


// socket io
app.get('/socket', (req, res) => {
    console.log("Hello World!");
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    console.log(`new connection ${socket.id}`);
    sendData(socket);
});


async function sendData(socket){

    await db.query("SELECT * FROM food_order", (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log("data emited successfully!");
            socket.emit('broadcast', results);
        }
    });
    
    setTimeout(() => {
        sendData(socket);
    }, 10000);
};


// start the app: use app.listen(PORT, callbackFunction);
server.listen(port, () => {
    console.log(`The server is running on http://127.0.0.1:${port}`);
});