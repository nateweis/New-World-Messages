const express = require('express')
const router = express.Router();
const Message = require('../models/messages.js')

router.get('/', Message.getRoomsMessages)
router.delete('/:id', Message.removeOneMessage)
router.put('/:id', Message.editOneMessage)

module.exports = router
