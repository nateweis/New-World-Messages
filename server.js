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
  origin:'http://localhost:3001',
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
  console.log("Listening port alone");
})
