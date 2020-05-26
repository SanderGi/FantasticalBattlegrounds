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
const tileWidth = 40, tileHeight = 20;

class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    
    this.tiles = new Uint8Array(width * height);
    this.tiles.fill(TileStatus.UPDATED + TileValue.GRASS);
    this.buildings = [];
    this.units = [];
  }
  
  show() {
    let screenPos = {};
    let tile;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        screenPos = this.toScreen(x, y);
        tile = this.tiles[x * this.width + y];
        this.drawTile(screenPos.x, screenPos.y, tile);
      }
    }
  }
  
  drawTile() {
    
  }
  
  toScreen(x, y) {
    
  }
}

const TileStatus = {
  UNDISCOVERED: 0,
  DISCOVERED: 85,
  UPDATED: 170,
  VALUES: 85
}; Object.freeze(TileStatus);

const TileValue = {
  SELECTED: 0,
  EMPTY: 1,
  GRASS: 2,
  RAINBOW: 3,
  TREE: 4,
  DEADTREE: 5,
  SAND: 6,
  WATER: 7
}; Object.freeze(TileValue);