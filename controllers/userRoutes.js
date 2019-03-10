const express = require('express')
const router = express.Router();
const User = require('../models/user.js')


// get rout for testing
router.get('/contacts/:id', User.viewContacts);
router.get('/:username', User.allUsers)
router.post('/', User.newUser);
router.post('/contacts', User.addToContacts);



module.exports = router;
