const express = require('express')
const router = express.Router();
const Session = require('../models/sessions.js')

router.post('/', Session.login)
router.delete('/', Session.logout)
router.get('/', Session.getUser)


module.exports = router;
