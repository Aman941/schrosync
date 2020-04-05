const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT||5000;

const {addUser , removeUser , getUsersInRoom , getUser} = require('./Users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect' , (socket) =>{
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
    
        console.log(user);
        if(error) return callback(error);
    
        socket.join(user.room);
    
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
        callback();
      });

      socket.on('linkChange' , ({video_id}) =>{
          const user = getUser(socket.id);
          console.log(socket.id);
          console.log(`link == ${video_id} requested by ${user.name}`);
          socket.broadcast.to(user.room).emit('changedLink' , {video_id:{video_id}});
      })
});

server.listen(PORT,() => (console.log(`Server has started on port ${PORT}`)));