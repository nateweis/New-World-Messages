const express = require('express')
const router = express.Router();
const Chat = require('../models/chat.js')

router.post('/', Chat.newChat)
router.post('/many', Chat.addManyUsers)
router.get('/members/:id', Chat.getChatParticipants)
router.get('/:id', Chat.getUsersChats)
router.delete('/remove/member', Chat.kickOutOfChat)
router.delete('/:id', Chat.removeChat)
router.put('/', Chat.renameChat)

module.exports = router
