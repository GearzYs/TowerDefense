// FACTORY | Create a zombie with random type and return it

import Zombie from '../models/Zombie.js';

class ZombieFactory {
    createZombie(canvas, verticalPosition, cellSize, zombieTypes) {
      const type = Math.floor(Math.random() * 1.5);
      const zombie = new Zombie(canvas, verticalPosition, cellSize, zombieTypes, type);
      return zombie;
    }
}

export default ZombieFactory;