const express = require('express')
const router = express.Router();
const User = require('../models/user.js')


// get rout for testing

router.post('/', User.newUser);



module.exports = router;
