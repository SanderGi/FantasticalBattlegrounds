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
  if (location.hash != "") join(location.hash);
});

function join(room) {
  console.log('joined ' + room);
  location.hash = room;
  document.getElementById('game').style.display = 'block';
  resize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  var newName = prompt("Please enter your new username.", user.name ? user.name : "Harry Potter");
  if (newName != null) {
    user.name = newName;
    localStorage.setItem('user', JSON.stringify(user));
  }
};

window.onbeforeunload = () => {
  location.hash = "";
};