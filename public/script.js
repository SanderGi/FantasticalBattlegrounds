const socket = io();
socket.on('connect', () => {
  console.log("SID: " + socket.id);
});