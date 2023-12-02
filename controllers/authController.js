const db = require("../config/dbConnection");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


// create registration controller 
const registerCrtl = (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;

    const testquery = db.query('SELECT * From users');

    db.query('SELECT email From users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        };

        if (results.length > 0) {
            return res.render('register', {
                message: "You are already registered with this email 😛!"
            })
        } else if ( password !== passwordConfirm ) {
            return res.render('register', {
                message: "Password do not match 🥱!"
            })
        };


        let hashedPassword = await bcryptjs.hash(password, parseInt(process.env.SALT_ROUND));

        // store the data into the mysql database: db.query(sql_query, data_you_want_to_store as an object, callbackFunction(error, results));
        db.query('INSERT INTO users SET ?', 
        {
            name: name,
            email: email, 
            password: hashedPassword

        }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: "User registered successfully 👏"
                })
            };

            res.send("Registration Failed 😥! Please try again!");
        });
    });
};


// create a login controller 
const loginCtrl = (req, res) => {
    res.render('login', {
        message: "Login successful 🙌❗"
    })
};


module.exports = { 
    registerCrtl, 
    loginCtrl 
};