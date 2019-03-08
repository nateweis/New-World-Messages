const express = require('express')
const router = express.Router();
const User = require('../models/user.js')


// get rout for testing
router.get('/', User.seeUser);
router.post('/', User.newUser);



module.exports = router;
