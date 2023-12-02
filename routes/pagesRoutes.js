const express = require('express');
const router = express.Router();


// router for index page 
router.get('/', (req, res) => {
    res.render('index');
});


// router for registration page 
router.get('/register', (req, res) => {
    res.render("register");
});


// router for login page 
router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;