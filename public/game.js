const socket = io();
var user = JSON.parse(localStorage.getItem('user'));
var players = [];
if (user == null) {
  user = { name: "Harry Potter" };
  localStorage.setItem('user', JSON.stringify(user));
}
const canvas = document.getElementById('canvas');
function resize() { canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight); console.log("resized canvas width: " + canvas.width); }
window.onresize = () => { resize(); };
const ctx = canvas.getContext('2d');

const tileSprite = new Image("https://cdn.glitch.com/00742a89-c4d3-4606-baad-f1fad6586440%2FisometricTiles.png?v=1590463010897");

class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    
    this.tiles = [];
    while (height--) {
        this.tiles.push(new Array(width).fill({v: 0, s: 3}));
    }
    this.buildings = [];
    this.units = [];
  }
  
  show() {
    let screenPos = {};
    let tile = {};
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        screenPos = this.toScreen(x, y);
        tile = this.tiles[x, y]
        this.drawTile(screenPos.x, screenPos.y, );
      }
    }
  }
}