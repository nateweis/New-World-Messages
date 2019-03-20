const db = require('../db/db_connection.js')

const getRoomsMessages = (req,res) => {
  db.any('SELECT messages.*, users.pic FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.id ASC')
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    console.log(err);
    console.log("problem getting the messages on load");
  })
}

// remove a single message
const removeOneMessage = (req,res) => {
  db.none('DELETE FROM messages WHERE id = $1',req.params.id)
  .then(() => {
    res.status(200).json({
      message:"message delete",
      status:200
    })
  })
  .catch((err) => {
    res.status(500).json({
      message:"problem deleting message",
      status:500,
      err:err
    })
  })
}

// edit a single message
const editOneMessage = (req,res) => {
  db.none('UPDATE messages SET message = $1 WHERE id = $2',
  [req.body.edit, req.params.id])
  .then(() => {
    db.one('SELECT messages.*, users.pic FROM messages JOIN users ON messages.user_id = users.id WHERE messages.id = $1',
    req.params.id)
    .then((data) => {
      res.json({
        message:"message edited",
        status:200,
        data:data
      })
    })
    .catch((err) => {
      res.json({
        err:err,
        message: "edit message failed",
        status: 500
      })
    })
  })
}

module.exports = {
  getRoomsMessages,
  removeOneMessage,
  editOneMessage
}
