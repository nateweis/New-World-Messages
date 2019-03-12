const express = require('express')
const router = express.Router();
const Chat = require('../models/chat.js')

router.post('/', Chat.newChat)
router.get('/:id', Chat.getUsersChats)

module.exports = router