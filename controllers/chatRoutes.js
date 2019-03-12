const express = require('express')
const router = express.Router();
const Chat = require('../models/chat.js')

router.post('/', Chat.newChat)

module.exports = router
