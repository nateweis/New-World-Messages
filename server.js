// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const http = require('http')
const socketIo = require('socket.io')
const session = require('express-session')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 3000;

// =======================================
//              Middleware
// =======================================
// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (true) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

const corsOption = {
  origin:'*',
  credentials: true
}
app.use(cors(corsOption))
app.use(express.json())
// app.use(express.static('public'));
app.use(session({
  secret: 'istillneverdidthankyoucardsfrommywedding',
  resave: false,
  saveUninitialized: false
}))

// =======================================
//              Controllers
// =======================================

const userController = require('./controllers/userRoutes.js')
app.use('/users', userController);

const sessionsController = require('./controllers/sessionsRoutes.js')
app.use('/sessions', sessionsController);

const chatController = require('./controllers/chatRoutes.js')
app.use('/chats', chatController)



// =======================================
//              Listeners
// =======================================


io.on('connection',(socket) => {
  console.log("fired a socket event", socket.id);

  let currentRoom = "nothing"

  socket.on('room',(room) => {
    currentRoom = room
    socket.join(room)
  })

  socket.on('message',(newMessage) => {
    io.to(currentRoom).emit('chat', newMessage)
  })


})



server.listen(port,() => {
  console.log("Listening port alone");
})
