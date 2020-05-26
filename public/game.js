const tileSprite = new Image("https://cdn.glitch.com/00742a89-c4d3-4606-baad-f1fad6586440%2FisometricTiles.png?v=1590463010897");

var players = [];

socket.on('userJoined', (id, name) => {
  players.push({id: id, name: name});
});