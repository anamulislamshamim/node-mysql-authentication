const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController.js');


// registration form submit route
router.post('/register', authController.registerCrtl);


module.exports = router;