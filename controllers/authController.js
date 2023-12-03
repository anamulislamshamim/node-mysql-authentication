const db = require("../config/dbConnection");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../config/jwtToken');


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
    const { email, password } = req.body;
    console.log(email, password);

    // check whether the email exist in our database or not
    db.query('SELECT * From users WHERE email=?', [email], async (error, results, fields) => {
        if (error) {
            return res.render('register', {
                message: "It seems you are not registered yet 🤨!"
            })
        };

        const hashedPassword = results[0].password;
        console.log(hashedPassword);

        if (results.length > 0 && (await isPasswordMatched(hashedPassword, password))) {
            // decrypt the hashed password and compare to the req password
            return res.render('dashboard', {
                message: "Login successful 🙌❗",
                user: results[0].name,
                email: results[0].email,
                token: generateToken(results[0].id)
            });
        };

        res.render('login', {
            message: "Wrong email or password 🤐"
        });

    });
};


// dashboard controller
const dashboardCtrl = (req, res) => {
    db.query('SELECT * FROM food_order', (error, results) => {
        if (error) {
            res.render('dashboard', { message: "Database Error ❌"})
        } else {
            res.render('dashboard', { data: results });
        }
    })
};


// create a logOut controller
const logOutCtrl = (req, res) => {
    console.log("Logout successfully!");
};


// create isPasswordMatched function 
const isPasswordMatched = async (hashedPassword, password) => {
    return await bcryptjs.compare(password, hashedPassword);
};


module.exports = { 
    registerCrtl, 
    loginCtrl,
    dashboardCtrl,
};