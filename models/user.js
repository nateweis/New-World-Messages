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

const seeUser = (req,res) => {
  db.any('SELECT * FROM users')
  .then((data) => {
    res.json({data:data})
  })
  .catch((err) => {
    console.log(err);
  })
}


module.exports = {
  seeUser: seeUser,
  newUser
}
