// Init all global variables and start the game loop

// Import models
import Cell from './models/Cell.js';

// Import views
import CanvasView from './views/CanvasView.js';

// Import controllers
import GameController from './controllers/GameController.js';

const cellSize = 50;

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 90*window.innerWidth/100; // 90% of the window width
canvas.height = Math.floor(window.innerHeight/cellSize)*cellSize;


let winningScore = 100000; //change this to play more


// global variables
const gameGrid = [];
const towers = [];
const towerTypes = [];
const zombies = [];
const zombieTypes = [];
const bullets = [];
const zombiesPosition = [];
const moneys = [];
let numberOfMoney = 300;
let gameFrame = 0;
let zombiesInterval = 200;
let gameOver = false;
let start = false;
let score = 0;
let towerChoose = 0;

const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
};

const grid = {
  x:0,
  y:0
}

const backgroundaudio = new Audio('./assets/8bit.mp3');
backgroundaudio.loop = true;
backgroundaudio.volume = 0.8;
const towerAudio = new Audio('./assets/tower.wav');
const zombieAudio = new Audio('./assets/enemydeath.mp3');
const fstZombie = new Image();
fstZombie.src = './assets/1ZombieSpriteSheet.png';
zombieTypes.push(fstZombie);
const sndZombie = new Image();
sndZombie.src = './assets/2ZombieSpriteSheet.png';
zombieTypes.push(sndZombie);
const fstTower = new Image();
fstTower.src = './assets/1TowerFrame.png';
towerTypes.push(fstTower);
const sndTower = new Image();
sndTower.src = './assets/2TowerFrame.png';
towerTypes.push(sndTower);

const fstTowerPlayer = {
  x: canvas.width / 2 - 30,
  y: 0,
  width: 69,
  height: 110,
  img: fstTower
};
const sndTowerPlayer = {
  x: canvas.width / 2 + 30,
  y: 0,
  width: 69,
  height: 110,
  img: sndTower
};

// Initialize models
var canvasPosition=canvas.getBoundingClientRect();
// Initialize views
const canvasView = new CanvasView(canvas, ctx, cellSize, mouse, canvasPosition, gameGrid, Cell, grid);

// Initialize controllers
const gameController = new GameController(
  canvasView,
  bullets,
  towers,
  towerTypes,
  towerAudio,
  fstTowerPlayer,
  sndTowerPlayer,
  zombieTypes,
  zombies,
  zombiesInterval,
  zombiesPosition,
  zombieAudio,
  moneys,
  numberOfMoney,
  gameGrid,
  gameFrame,
  score,
  winningScore,
  ctx,
  mouse,
  gameOver,
  canvas,
  start,
  backgroundaudio,
  towerChoose,
  grid
);

// Event listeners
canvas.addEventListener('mousemove', (e) => canvasView.handleMouseMove(e));
canvas.addEventListener('mouseleave', () => canvasView.handleMouseLeave());
canvas.addEventListener('click', () => gameController.handleMouseClick());

window.addEventListener('resize', () => canvasView.handleResize());

function animate() {
  canvasView.clearCanvas();
  canvasView.createGrid();
  gameController.updateGame();
}

// Start the animation loop
animate();