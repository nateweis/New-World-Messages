const express = require('express')
const router = express.Router();
const Message = require('../models/messages.js')

router.get('/:room', Message.getRoomsMessages)

module.exports = router
