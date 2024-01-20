// This file contains the Zombie class. It is used to create new zombies.

class Zombie {
  constructor(canvas, verticalPosition, cellSize, zombieTypes, type) {
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.type = type;
    this.speed = 0.5 + this.type * 0.3;
    this.movement = this.speed;
    this.health = this.type ? 150 : 100;
    this.maxHealth = this.type ? 150 : 100;
    this.zombieTypes = zombieTypes[this.type];
    this.minSprite = 0;
    this.maxSprite = 2;
    this.spriteX = 0;
    this.spriteW = 29;
    this.spriteH = 36;
  }
}
  
export default Zombie;  