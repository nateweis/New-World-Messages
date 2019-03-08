// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)





io.on('connection',(socket) => {
  console.log("fired a socket event", socket.id);

  socket.on("chat",(data) => {
    io.sockets.emit('message',data)
  })


})






server.listen(3000,() => {
  console.log("Listening withi io");
})
