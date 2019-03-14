const express = require('express')
const router = express.Router();
const Chat = require('../models/chat.js')

router.post('/', Chat.newChat)
router.post('/many', Chat.addManyUsers)
router.get('/:id', Chat.getUsersChats)
router.delete('/:id', Chat.removeChat)

module.exports = router
