const db = require('../db/db_connection.js')

const getRoomsMessages = (req,res) => {
  db.any('SELECT * FROM messages WHERE chat_id = $1', req.params.room)
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    console.log(err);
    console.log("problem getting the messages on load");
  })
}

module.exports = {
  getRoomsMessages
}
