var user = JSON.parse(localStorage.getItem('user'));
if (user == null) {
  user = { name: "Harry Potter" };
  localStorage.setItem('user', JSON.stringify(user));
}
const canvas = document.getElementById('canvas');
function resize() { canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight); console.log("resized canvas width: " + canvas.width); }
window.onresize = () => { resize(); };
const ctx = canvas.getContext('2d');
const socket = io();

socket.on('connect', () => {
  console.log("SID: " + socket.id);
  if (location.hash != "") join(location.hash.substr(1));
  socket.emit('setName', user.name);
});

function join(room) {
  console.log('joined ' + room);
  location.hash = "";
  document.getElementById('game').style.display = 'block';
  resize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit('join', room, user.name, function (others) {
    console.log(others);
  });
}

document.getElementById('create').onclick = () => {
  document.getElementById('game').style.display = 'block';
  resize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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