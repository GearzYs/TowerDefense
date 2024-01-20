// Handle the game logic and update the game state

import UpdateEntites from './UpdateEntities.js';
import TowerBuilder from './TowerBuilder.js';
import Money from '../models/Money.js';
import collision from '../utilities/Collision.js';
import DrawEntities from '../views/DrawEntities.js';
import GameStatus from '../views/GameStatus.js';
import ZombieFactory from './ZombieFactory.js';
import GameOverObserver from '../utilities/GameOverObserver.js';

class GameController {
  constructor(canvasView, bullets, towers, towersTypes, towerAudio, fstTowerPlayer, sndTowerPlayer, zombieTypes, zombies, zombiesInterval, zombiesPosition, zombieAudio, monies, numberOfMoney, gameGrid, gameFrame, score, winningScore, ctx, mouse, gameOver, canvas, start, backgroundaudio, towerChoose, grid) {
    this.canvasView = canvasView;
    this.bullets = bullets;
    this.towers = towers;
    this.towersTypes = towersTypes;
    this.towerAudio = towerAudio;
    this.fstTowerPlayer = fstTowerPlayer;
    this.sndTowerPlayer = sndTowerPlayer;
    this.towerChoose = towerChoose;
    this.zombieTypes = zombieTypes;
    this.zombies = zombies;
    this.zombiesInterval = zombiesInterval;
    this.zombiesPosition = zombiesPosition;
    this.zombieAudio = zombieAudio;
    this.monies = monies;
    this.numberOfMoney = numberOfMoney;
    this.gameGrid = gameGrid;
    this.gameFrame = gameFrame;
    this.score = score;
    this.winningScore = winningScore;
    this.ctx = ctx;
    this.mouse = mouse;
    this.gameOver = gameOver;
    this.cellSize = this.canvasView.cellSize;
    this.canvas = canvas;
    this.start = start;
    this.backgroundaudio = backgroundaudio;
    this.grid = grid;
    this.notenoughmoney = false;
    this.DrawEntities = new DrawEntities();
    this.UpdateEntites = new UpdateEntites();
    this.GameStatus = new GameStatus();
    this.ZombieFactory = new ZombieFactory();
    this.GameOverObserver = new GameOverObserver();
  }

  handleMouseClick() {
    if (!this.start){
      this.start=true;
      this.backgroundaudio.play();
    }
    const gridPositionX = this.mouse.x - (this.mouse.x % this.cellSize);
    const gridPositionY = this.mouse.y - (this.mouse.y % this.cellSize);

    for (let i = 0; i < this.towers.length; i++) {
      if (
        this.towers[i].x === gridPositionX &&
        this.towers[i].y === gridPositionY
      ) {
        return;
      }
    }

    if (collision(this.mouse, this.fstTowerPlayer) && this.towerChoose !== 0) {
      this.towerChoose = 0;
    }
    else if (collision(this.mouse, this.sndTowerPlayer) && this.towerChoose !== 1) {
      this.towerChoose = 1;
    }

    if (gridPositionY < this.cellSize) return;
    let towerCost;
    (this.towerChoose)?towerCost=150:towerCost=100;
    if (this.numberOfMoney >= towerCost) {
      this.notenoughmoney = false;
      this.towers.push(new TowerBuilder()
      .withPosition(gridPositionX, gridPositionY)
      .withCellSize(this.cellSize)
      .withBullets(this.bullets)
      .withTowersTypes(this.towersTypes)
      .withType(this.towerChoose)
      .withTowerAudio(this.towerAudio)
      .build());
      this.numberOfMoney -= towerCost;
    }
    else {
      this.notenoughmoney = true;
    }
  }

  handleGameGrid() {
    for (let i = 0; i < this.gameGrid.length; i++) {
      this.DrawEntities.drawCell(this.gameGrid[i],this.ctx);
    }
  }

  handleBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      this.UpdateEntites.updateBullet(this.bullets[i]);
      this.DrawEntities.drawBullet(this.bullets[i],this.ctx);
      for (let j = 0; j < this.zombies.length; j++) {
        if (
          this.zombies[j] &&
          this.bullets[i] &&
          collision(this.bullets[i], this.zombies[j])
        ) {
          this.zombies[j].health -= this.bullets[i].power;
          this.bullets.splice(i, 1);
          i--;
        }
      }
      if (this.bullets[i] && this.bullets[i].x > this.canvas.width - this.cellSize) {
        this.bullets.splice(i, 1);
        i--;
      }
    }
  }

handleTowers() {
  for (let i = 0; i < this.towers.length; i++) {
    this.DrawEntities.drawTower(this.towers[i],this.ctx);
    this.UpdateEntites.updateTower(this.towers[i],this.gameFrame);
    if (
      this.zombiesPosition.indexOf(this.towers[i].y) !== -1 &&
      this.towers[i].checkIfShooting() === false
    ) {
      this.towers[i].shooting = true;
    } else if (
      this.zombiesPosition.indexOf(this.towers[i].y) === -1 &&
      this.towers[i].checkIfShooting() === true
    ) {
      this.towers[i].shooting = false;
    }
    for (let j = 0; j < this.zombies.length; j++) {
      if (this.towers[i] && collision(this.towers[i], this.zombies[j])) {
        this.zombies[j].movement = 0;
        this.towers[i].health -= 0.1;
      }
      if (this.towers[i] && this.towers[i].health <= 0) {
        this.towers.splice(i, 1);
        i--;
        this.zombies[j].movement = this.zombies[j].speed;
      }
    }
  }
}

  handleZombies() {
    for (let i = 0; i < this.zombies.length; i++) {
      this.UpdateEntites.updateZombie(this.zombies[i],this.gameFrame);
      this.DrawEntities.drawZombie(this.zombies[i],this.ctx);
      this.gameOver=this.GameOverObserver.checkGameOver(this.gameOver,this.zombies[i]);
      if (this.zombies[i].health <= 0) {
        this.notenoughmoney = false;
        this.zombieAudio.play();
        let gainedMoney = this.zombies[i].maxHealth;
        this.numberOfMoney += gainedMoney;
        this.score += gainedMoney;
        const findThisIndex = this.zombiesPosition.indexOf(this.zombies[i].y);
        this.zombiesPosition.splice(findThisIndex, 1);
        this.zombies.splice(i, 1);
        i--;
      }
    }
    if (this.gameFrame % this.zombiesInterval === 0 && this.score < this.winningScore) {
      let verticalPosition = Math.floor((Math.random() * this.grid.y)+1) * this.cellSize;
      this.zombies.push(this.ZombieFactory.createZombie(this.canvas, verticalPosition, this.cellSize, this.zombieTypes));
      this.zombiesPosition.push(verticalPosition);
    }
  }

  handleMoney() {
    if (this.gameFrame % 1000 == 0 && this.score < this.winningScore) {
      this.monies.push(new Money(this.cellSize, this.canvas.width, this.grid));
    }
    for (let i = 0; i < this.monies.length; i++) {
      this.DrawEntities.drawMoney(this.monies[i],this.ctx);
      if (this.monies[i] && this.mouse.x && this.mouse.y && collision(this.mouse,this.monies[i])) {
        this.numberOfMoney += this.monies[i].amount;
        this.monies.splice(i, 1);
        i--;
      }
    }
  }

  handleGameStatus() {
    this.GameStatus.displayScore(this.ctx, this.score);
    this.GameStatus.displayLevel(this.ctx, (Math.floor(100-this.zombiesInterval/2)), this.canvas);
    if (this.gameOver) {
      this.GameStatus.diplayGameOver(this.ctx, this.canvas);
    }
    if (this.score >= this.winningScore && this.zombies.length === 0) {
      this.GameStatus.displayWon(this.ctx, this.canvas);
    }
    if (this.notenoughmoney) {
      this.GameStatus.displayNotEnoughMoney(this.ctx, this.numberOfMoney);
    }
    else {
      this.GameStatus.displayMoney(this.ctx, this.numberOfMoney)
    }
  }

  updateGame() {
    this.zombiesInterval = this.zombiesInterval < 1 ? 1 : 200 - this.score / 100;
    this.canvasView.clearCanvas();
    this.canvasView.drawControlsBar();
    this.handleGameGrid();
    this.handleTowers();
    this.handleZombies();
    this.handleBullets();
    this.handleMoney();
    this.handleGameStatus();
    this.GameStatus.displayTowerChoose(this.ctx, this.mouse, this.fstTowerPlayer, this.sndTowerPlayer, this.towerChoose, this.cellSize);
    if (!this.gameOver) {
      this.gameFrame++;
      requestAnimationFrame(() => this.updateGame());
    }
  }
}

export default GameController;
