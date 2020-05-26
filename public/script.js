var user = {};
const socket = io();

socket.on('connect', () => {
  console.log("SID: " + socket.id);
});

document.getElementById('profile').onclick = () => {
  var newName = prompt("Type new username below:", user.name ? user.name : "Harry Potter");
};