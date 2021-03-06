const bcrypt = require('bcrypt')
const db = require('../db/db_connection.js')
// add a user

const newUser = (req,res) => {
 req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
 db.none('INSERT INTO users (username, password) VALUES(${username}, ${password})', req.body)
 .then(() => {
   res.status(200).json({message: 'user made'})
 })
 .catch((err) => {
   console.log(err);
 })
}


// see user info
const allUsers = (req,res) => {
  db.any('SELECT * FROM users WHERE username = $1',req.params.username)
  .then((data) => {
    res.json({info: data})
  })
  .catch((err) => {
      console.log(err);
  })
}

// addUser To Contacts List
const addToContacts = (req,res) => {
  db.none('INSERT INTO contacts (username,user_id,pic,contact_id) VALUES(${username},${user_id},${pic},${contact_id})',
  req.body)
  .then((data) => {
    res.json({message:"added to contacts"})
  })
  .catch((err) => {
    console.log(err);
  })
}

// look at your contact list
const viewContacts = (req,res) => {
  db.any('SELECT contacts.* FROM users JOIN contacts ON users.id = contacts.user_id WHERE users.id = $1', req.params.id)
  .then((data) => {
    res.json(data)
  })
  .catch((er) => {
    console.log(err);
  })
}

// change the users current room
const changeRoom = (req,res) => {
  db.none('UPDATE users SET current_room = $1 WHERE id = $2',
  [req.body.chat_id, req.body.id])
  .then(() => {
    res.json({message:"user room changed"})
  })
  .catch(() => {
    console.log("Somthing wrong with the room change");
  })
}

const updateProfile = (req,res) => {
  db.none('UPDATE users SET pic = $1, email = $2 WHERE id = $3',
  [req.body.pic, req.body.email, req.params.id])
  .then(() => {
    res.status(202).json({
      message:"profile has been updated",
      status: 202
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "update profile didnt work on backend",
        err : err
      })
    })
  })
}


module.exports = {
  newUser,
  allUsers,
  addToContacts,
  viewContacts,
  changeRoom,
  updateProfile
}

//
