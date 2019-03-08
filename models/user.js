const promise = require('bluebird')
const options = {
  promiseLib: promise
}


const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/chat_app';
const db = pgp(connectionString);
db.connect();

// add a user

const newUser = (req,res) => {
 console.log(req);
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
  seeUser: seeUser
}
