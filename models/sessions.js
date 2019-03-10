const promise = require('bluebird')
const bcrypt = require('bcrypt')
const options = {
  promiseLib: promise
}


const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/chat_app';
const db = pgp(connectionString);


// DELETE SESSION
const logout = (req,res) => {
  req.session.destroy(() => {
    res.status(200).json({
      message: "logout complete"
    })
  })
}

//NEW SESSION

const login = (req,res) => {
  db.one('SELECT * FROM users WHERE username = $1', req.body.username)
  .then((data) => {
    if(!data){res.status(404).json({message:"wrong username/password"})}
    else{
      if(bcrypt.compareSync(req.body.password, data.password)){
        req.session.currentUser = data;
        res.status(201).json({message:"user logged in"})
      }
      else{
        res.status(401).json({message:"wrong username/password"})
      }
    }
  })
}


module.exports ={
  login,
  logout
}
