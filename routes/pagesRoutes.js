const express = require('express');
const { orderCtrl } = require('../controllers/dashboardController');
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


// order route for normal customer 
router.post('/order', orderCtrl);


// rose router
router.get('/rose', (req, res) => {
    res.render('rose');
});


module.exports = router;