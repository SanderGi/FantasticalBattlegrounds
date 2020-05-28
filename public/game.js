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

const tileSprite = new Image();
tileSprite.src = "https://cdn.glitch.com/00742a89-c4d3-4606-baad-f1fad6586440%2FisometricTiles.png?v=1590463010897";

class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    
    this.tileWidth = 40;
    this.tileHeight = 20;
    this.originX = (canvas.width - this.tileWidth) / 2;
    this.originY = 0;
    
    this.tiles = new Uint8Array(width * height);
    this.tiles.fill(TileStatus.UPDATED | TileValue.GRASS);
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
        this.drawTile(screenPos.x, screenPos.y, tile & 0xC0, tile & 0x3F);
      }
    }
  }
  
  drawTile(x, y, status, value) {
    if (status == TileStatus.UNDISCOVERED) return;
    if (status == TileStatus.DISCOVERED) ctx.globalAlpha = 0.4;
    else ctx.globalAlpha = 1;
    switch (value) {
      case TileValue.SELECTED:
        ctx.drawImage(tileSprite,0,0,40,20,x,y,this.tileWidth,this.tileHeight);
        break;
      case TileValue.EMPTY:
        ctx.drawImage(tileSprite,40,0,40,20,x,y,this.tileWidth,this.tileHeight);
        break; 
      case TileValue.GRASS:
        ctx.drawImage(tileSprite,80,0,40,20,x,y,this.tileWidth,this.tileHeight);
        break;
      default:
        ctx.drawImage(tileSprite,120,0,40,20,x,y,this.tileWidth,this.tileHeight);
        break;
    }
  }
  
  toScreen(x, y) {
    return { x: (x - y) * this.tileWidth / 2 + this.originX, y: (x + y) * this.tileHeight / 2 + this.originY };
  }
}

const TileStatus = {
  UNDISCOVERED: 0x00,
  DISCOVERED: 0x40,
  UPDATED: 0x80
}; Object.freeze(TileStatus);

const TileValue = {
  SELECTED: 0x00,
  EMPTY: 0x01,
  GRASS: 0x02,
  RAINBOW: 0x03,
  TREE: 0x04,
  DEADTREE: 0x05,
  SAND: 0x06,
  WATER: 0x07
}; Object.freeze(TileValue);