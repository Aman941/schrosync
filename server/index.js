//heroku restart -a app_name
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
      });

      // on sync video request

      socket.on('syncVideo' , ({time}) => {
          const user = getUser(socket.id);
          console.log(`time recieved ${time}`);
          socket.broadcast.to(user.room).emit('videoSync' , {time});
      });

      // on send message

      socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message });
    
        callback();
      });

      // on Disconnect

      socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      });
});

server.listen(PORT,() => (console.log(`Server has started on port ${PORT}`)));