const db = require('../db/db_connection.js')

// adding a new chat to the db with the creater part of it
const newChat = (req,res) => {
  console.log(req.body);
  db.none('INSERT INTO  chats (chat) VALUES ($1);',
  req.body.name)
  .then((data) => {
    getNewChatsId(req.body.user_id,res)
  })
  .catch((err) => {
    console.log(err);
    res.json({message:err})
    console.log("issues adding a new chat");
  })
}

const getNewChatsId = (user_id, res) => {
  db.one('SELECT * FROM chats ORDER BY id DESC LIMIT 1;')
  .then((data) => {
    combineUserToNewChat(data.id, user_id, res)
  })
  .catch((err) => {
    console.log(err);
    res.json({message:err})
    console.log("somthings wrong with geting the new chats id");
  })
}

const combineUserToNewChat = (chat_id, user_id ,res) => {
  db.none('INSERT INTO chat_users (user_id, chat_id, admin) VALUES ($1, $2, true);',
[user_id, chat_id])
.then(() => {
  res.status(200).json({message:"Successfull user made"})
})
.catch((err) => {
  console.log(err);
  res.json({message:err})
  console.log("putting the ids to its own table was a fail");
})
}

  const getUsersChats = (req,res) => {
    db.any('SELECT users.*, chats.chat, chat_users.admin, chat_users.chat_id FROM users JOIN chat_users ON users.id = chat_users.user_id JOIN chats ON chat_users.chat_id = chats.id WHERE users.id = $1;',
  req.params.id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.log(err);
      console.log("somthing wrong with getting user chats on backend");
    })
  }

  // adding friend to your chat
  const addManyUsers = (req,res) => {
    for (let i = 0; i < req.body.userArr.length; i++) {
      db.none('INSERT INTO chat_users (user_id,admin,chat_id) VALUES ($1,false,$2);',
    [req.body.userArr[i],req.body.chat_id])
    .then(() => {
      res.json({message:'all users have been added to chat'})
    })
    .catch((err) => {
      res.json({
        err: err,
        message: "thers something wrong in the adding users to chats backend"
      })
      console.log("thers something wrong in the adding users to chats backend");
    })
    }
  }

  // removing chat alltogether
  const removeChat = (req,res) => {
    db.none('DELETE FROM chats WHERE id = $1', req.params.id)
    .then(() => {
      db.none('DELETE FROM chat_users WHERE chat_id = $1', req.params.id)
      .then(() => {
        res.status(200).json({message:"removed chat"})
      })
      .catch(() => {
        console.log("somting wrong in remove chat");
      })
    })
  }



module.exports = {
  newChat,
  getUsersChats,
  addManyUsers,
  removeChat
}
