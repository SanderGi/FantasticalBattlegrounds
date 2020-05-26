// init project
const express = require('express'); // Express contains some boilerplate to for routing and such
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); // Here's where we include socket.io as a node module 

// make all the files in 'public' available
app.use(express.static("public"));
// use json
app.use(express.json({ limit: "10kb" }));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

io.sockets.on('connection', function(socket){
  console.log('new connection: ' + socket.id);
  
  socket.on('setName', (name) => {
    socket.name = name;
  });
  
  socket.on('join', (room, username, returnUsers) => {
    io.in(room).clients((error, clients) => {
      if (error) throw error;
      for (let i = 0; i < clients.length; i++) {
        clients[i] = { id: clients[i], name: io.sockets.connected[clients[i]].name };
      }
      returnUsers(clients);
    });
    socket.join(room);
    socket.to(room).emit('userJoined', socket.id, username);
  });
  
  socket.on('leave', (room) => {
    socket.leave(room);
    socket.to(room).emit('userLeft', socket.id);
  });
});

// io.sockets.adapter.rooms['room'].sockets // all users from room `room`

//   socket.emit('hello', 'can you hear me?', 1, 2, 'abc'); // sending to the client
//   socket.broadcast.emit('broadcast', 'hello friends!'); // sending to all clients except sender
//   socket.to('game').emit('nice game', "let's play a game"); // sending to all clients in 'game' room except sender
//   socket.to('game1').to('game2').emit('nice game', "let's play a game (too)"); // sending to all clients in 'game1' and/or in 'game2' room, except sender
//   io.in('game').emit('big-announcement', 'the game will start soon'); // sending to all clients in 'game' room, including sender
//
//   io.to(socketId).emit('hey', 'I just met you'); // sending to individual socketid (private message)
//   // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room named `socket.id` but the sender
//   socket.emit('question', 'do you think so?', function (answer) {}); // sending with acknowledgement
//
//   socket.compress(false).emit('uncompressed', "that's rough"); // sending without compression
//   socket.volatile.emit('maybe', 'do you really need it?'); // sending a message that might be dropped if the client is not ready to receive messages
//   socket.binary(false).emit('what', 'I have no binaries!'); // specifying whether the data to send has binary data
//   
//   io.local.emit('hi', 'my lovely babies'); // sending to all clients on this node (when using multiple nodes)
//   io.emit('an event sent to all connected clients'); // sending to all connected clients

// // send entries to web page
// app.get("/getEntries", function (request, response) {
//   var dbEntries=[];
//   db.find({}, function (err, entries) { // Find all entries in the collection
//     entries.forEach(function(entry) {
//       dbEntries.push({ username: entry.username, score: entry.score }); // adds the info to the dbEntries value
//     });
//     response.send(dbEntries); // sends dbEntries back to the page
//   });
// });

// // enter a new entry to database
// app.post("/postEntry", function (request, response) {
//   db.insert(request.body, function (err, entryAdded) {
//     if(err) console.log("There's a problem with the database: ", err);
//     else if(entryAdded) console.log("New entry inserted in the database");
//   });
//   response.sendStatus(200);
// });

app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function(){
  console.log('listening on port',app.get('port'));
});