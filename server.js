// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const http = require('http')
const socketIo = require('socket.io')
const session = require('express-session')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 3000;

// =======================================
//              Middleware
// =======================================

app.use(express.json())
app.use(express.static('public'));
app.use(session({
  secret: 'istillneverdidthankyoucardsfrommywedding',
  resave: false,
  saveUninitialized: false
}))

// =======================================
//              Controllers
// =======================================




// =======================================
//              Listeners
// =======================================


io.on('connection',(socket) => {
  console.log("fired a socket event", socket.id);

  socket.on("chat",(data) => {
    io.sockets.emit('message',data)
  })


})



server.listen(port,() => {
  console.log("Listening withi io");
})
