const express = require('express')
const router = express.Router();
const User = require('../models/user.js')


// get rout for testing
router.get('/', User.seeUser);



module.exports = router;
