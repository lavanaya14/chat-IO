const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');
});

socket.on('new user', function(data, callback){
  if(username.indexOf(data) !=   -1){
    callback(false);
  }else{
    callback(true);
    socket.username = data;
    usernames.push(socket.username);
    updateUsernames();
  }
});

//update useername
function updateUsernames(){
  io.emit('usernames', username);
}

io.on('send message', function(data){
  io.emit('new message', {msg: data});
});

//disconnect
io.on('disconnect', function(data){
  if(!socket.username){
    return;
  }
  usernames.splice(usernames.indexOf(socket.username), 1);
  updateUsernames();
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});