// This file contains the Tower class. It is used to create new towers.

class Tower {
    constructor(x, y, cellSize, bullets, towersTypes, type, towerAudio) {
      this.x = x;
      this.y = y;
      this.cellSize = cellSize;
      this.shooting = false;
      this.health = type ? 200 : 100;
      this.width = this.cellSize;
      this.height = this.cellSize;
      this.bullets = bullets;
      this.timer = 0;
      this.type=type;
      this.towersType = towersTypes[type];
      this.minSprite = 0;
      this.maxSprite = 4;
      this.spriteW = 69;
      this.spriteH = 110;
      this.spriteX = 0;
      this.towerAudio = towerAudio;
    }

    checkIfShooting() {
      return this.shooting;
    }

  }
  
  export default Tower;