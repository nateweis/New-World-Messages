const bcrypt = require('bcrypt')
const db = require('../db/db_connection.js')


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
        res.status(201).append('Accept','true').json({message:"user logged in",})
      }
      else{
        res.status(401).json({message:"wrong username/password"})
      }
    }
  })
}

const getUser = (req,res) => {
  console.log("this is also runnig getUser");
  if(req.session.currentUser){
    db.one('SELECT * FROM users WHERE id = $1',[req.session.currentUser.id])
    .then((data) => {
      console.log(data);
      res.json(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }
}


module.exports ={
  login,
  logout,
  getUser
}
