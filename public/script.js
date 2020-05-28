socket.on('connect', () => {
  console.log("SID: " + socket.id);
  if (location.hash != "") join(location.hash.substr(1));
  socket.emit('setName', user.name);
});

socket.on('userJoined', (id, name) => {
  players.push({id: id, name: name});
});

function join(room) {
  console.log('joined ' + room);
  location.hash = "";
  document.getElementById('game').style.display = 'block';
  resize();
  socket.emit('join', room, user.name, function (others) {
    players.concat(others);
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('create').onclick = () => {
  document.getElementById('game').style.display = 'block';
  resize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(10, 10);
  window.requestAnimationFrame(world.loop);
};

document.getElementById('join').onclick = () => { 
  var room = prompt("Please enter the room id.", "8duawidlda");
  if (room != null) join(room);
};

document.getElementById('profile').onclick = () => {
  var newName = prompt("Please enter your new username.", (user.name ? user.name : "Harry Potter"));
  if (newName != null) {
    user.name = newName;
    localStorage.setItem('user', JSON.stringify(user));
    socket.emit('setName', user.name);
  }
};

// window.addEventListener("beforeunload", function (e) {
//   if (gameRunning) {
//     return "You are in the middle of a game. Are you sure you wanna leave? ";
//   }
// });