// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const http = require('http')
const socketIo = require('socket.io')
const session = require('express-session')
const cors = require('cors')
const db = require('./db/db_connection.js')

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
  origin:'https://nwmessages.herokuapp.com/',
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false
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

const messageController = require('./controllers/messageRoute.js')
app.use('/messages', messageController)



// =======================================
//            Socket Listeners
// =======================================


io.on('connection',(socket) => {
  console.log("fired a socket event", socket.id);

  let currentRoom = "nothing"

  socket.on('leave',(room) => {
    socket.leave(room)
  })

  socket.on('room',(room) => {
    currentRoom = room
    socket.join(room)
  })

  socket.on('message',(newMessage) => {
    db.none('INSERT INTO messages (chat_id,sender,message,user_id) VALUES (${chat_id},${sender},${msg},${user_id})', newMessage)
    .then(() => {
      db.one('SELECT messages.*, users.pic FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.id DESC LIMIT 1;')
      .then((data) => {
        console.log(data);
        io.to(currentRoom).emit('chat', data)
      })
      .catch((err) => {
        console.log(err);
        console.log("new message retrive isnt working");
      })
    })
  })


})



server.listen(port,() => {
  console.log("Listening port alone");
})
