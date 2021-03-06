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
        db.none('DELETE FROM messages WHERE chat_id = $1', req.params.id)
        .then(() => {
          res.status(200).json({message:"removed chat"})
        })
        .catch(() => {
          console.log("somting wrong in remove chat");
        })
      })
    })
  }

  // renaming the chat
  const renameChat = (req,res) => {
    db.none('UPDATE chats SET chat = ${chat} WHERE id = ${id}', req.body)
    .then(() => {
      db.one('SELECT users.*, chats.chat, chat_users.admin, chat_users.chat_id FROM users JOIN chat_users ON users.id = chat_users.user_id JOIN chats ON chat_users.chat_id = chats.id WHERE chats.id = $1;',
      req.body.id)
      .then((data) => {
        res.json({
          status:200,
          message:'Successfull',
          data:data
        })
      })
      .catch((err) => {
        res.json({
          status:500,
          err:err,
          message:"in renameChat"
        })
      })
    })
  }

  // getting the members of the chats info
  const getChatParticipants = (req,res) => {
    db.any('SELECT users.* FROM users JOIN chat_users ON users.id = chat_users.user_id WHERE chat_users.chat_id = $1',
    req.params.id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      ses.status(500).json({
        err: err,
        message: "couldnt get the members of the chat ",
        status: 500
      })
    })
  }

  // kick member out of chat room
  const kickOutOfChat = (req,res) => {
    db.none('DELETE FROM chat_users WHERE user_id = $1 AND chat_id = $2',
    [req.body.user,req.body.chat])
    .then(() => {
      res.status(200).json({
        message:"delete Successfull",
        status: 200
      })
    })
    .catch((err) => {
      res.status(500).json({
        message:"problem removing user",
        status:500,
        err:err
      })
    })
  }




module.exports = {
  newChat,
  getUsersChats,
  addManyUsers,
  removeChat,
  renameChat,
  getChatParticipants,
  kickOutOfChat
}
