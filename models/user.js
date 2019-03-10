const promise = require('bluebird')
const bcrypt = require('bcrypt')
const options = {
  promiseLib: promise
}


const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/chat_app';
const db = pgp(connectionString);
db.connect();

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
  db.none('INSERT INTO contacts (username,user_id,pic) VALUES(${username},${user_id},${pic})',
  req.body)
  .then((data) => {
    res.json({message:"added to contacts"})
  })
  .catch((err) => {
    console.log(err);
  })
}


module.exports = {
  newUser,
  allUsers,
  addToContacts
}
