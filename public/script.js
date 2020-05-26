var user = JSON.parse(localStorage.getItem('user'));
if (user == null) {
  user = { name: "Harry Potter" };
  localStorage.setItem('user', JSON.stringify(user));
}
const socket = io();

socket.on('connect', () => {
  console.log("SID: " + socket.id);
  if (location.hash != "") join(location.hash);
});

function join(room) {
  console.log('joined ' + room);
  location.hash = room;
  document.getElementById('game').style.display = 'block';
}

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