// This file contains the class UpdateEntities which is responsible for updating the entities in the game.
import Bullet from '../models/Bullet.js';

class UpdateEntites {
    updateBullet(bullet) {
        bullet.x += bullet.speed;
    }
    updateTower(tower,gameFrame) {
        if (gameFrame % 20 === 0 && tower.shooting) {
          if (tower.spriteX < tower.maxSprite) tower.spriteX++;
          else tower.spriteX = tower.minSprite;
        }
        if (tower.shooting) {
          tower.timer++;
          if (tower.timer % 100 === 0) {
            tower.bullets.push(new Bullet(tower.x + 35, tower.y + 25, tower.type));
            tower.towerAudio.play();
          }
        } else {
          tower.timer = 0;
          tower.spriteX = 2;
        }
    }
    updateZombie(zombie,gameFrame) {
        zombie.x -= zombie.movement;
        if (gameFrame % 10 === 0) {
          if (zombie.spriteX < zombie.maxSprite) zombie.spriteX++;
          else zombie.spriteX = zombie.minSprite;
        }
    }
}

export default UpdateEntites;