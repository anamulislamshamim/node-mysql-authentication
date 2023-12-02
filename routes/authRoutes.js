const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController.js');


// registration form submit route
router.post('/register', authController.registerCrtl);
// login form submit route
router.post('/login', authController.loginCtrl);


module.exports = router;