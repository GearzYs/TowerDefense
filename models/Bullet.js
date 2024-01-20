// This file contains the bullet model of the catapults. It is used to create new bullets.

class Bullet {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.width = type ? 15 : 10;
      this.height = type ? 15 : 10;
      this.power = type ? 30 : 15;
      this.speed = type ? 10 : 5;
      this.type = type;
    }
  }
  
  export default Bullet;
  