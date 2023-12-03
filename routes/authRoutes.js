const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController.js');
const { dashboardUpdateCtrl } = require("../controllers/dashboardController.js");


// registration form submit route
router.post('/register', authController.registerCrtl);
// login form submit route
router.post('/login', authController.loginCtrl);
// dashboard route
router.get('/dashboard', authController.dashboardCtrl);
// logout route 



module.exports = router;