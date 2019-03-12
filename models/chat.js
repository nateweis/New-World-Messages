const db = require('../db/db_connection.js')

// adding a new chat to the db with the creater part of it
const newChat = (req,res) => {
  db.one('INSERT INTO  chats (chat,admin) VALUES ($1 , true)',
  req.body.name)
  .then((data) => {
    res.status(202).json(getNewChatsId(req.body.user_id))
  })
  .catch((err) => {
    console.log(err);
    console.log("issues adding a new chat");
  })
}

const getNewChatsId = (user_id) => {
  db.one('SELECT * FROM chats ORDER BY id DESC LIMIT 1')
  .then((data) => {
    combineUserToNewChat(data.id, user_id)
    return {message:"Success"}
  })
  .catch((err) => {
    console.log(err);
    console.log("somthings wrong with geting the new chats id");
  })
}

const combineUserToNewChat = (chat_id, user_id) => {
  db.none('INSERT INTO chat_users (user_id, chat_id) VALUES ($1, $2)',
[user_id, chat_id])
.then(() => {
  return "Success"
})
.catch((err) => {
  console.log(err);
  console.log("putting the ids to its own table was a fail");
})
}

  const getUsersChats = (req,res) => {
    db.any('SELECT users.*, chats.chat, chats.admin FROM users JOIN chat_users ON users.id = chat_users.user_id JOIN chats ON chat_users.chat_id = chats.id WHERE users.id = $1',
  req.params.id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err);
      console.log("somthing wrong with getting user chats on backend");
    })
  }

module.exports = {
  newChat,
  getUsersChats
}
