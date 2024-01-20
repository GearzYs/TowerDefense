// Draw entities on the canvas

const moneyImg = new Image();
moneyImg.src = './assets/coin.png';
import collision from '../utilities/Collision.js';

class DrawEntities {
    drawZombie(zombie, ctx) {
        ctx.fillStyle = 'gold';
        ctx.font = '20px Bungee Spice';
        ctx.fillText(Math.floor(zombie.health), zombie.x, zombie.y);
        ctx.drawImage(zombie.zombieTypes, zombie.spriteX * zombie.spriteW, 0, zombie.spriteW, zombie.spriteH, zombie.x, zombie.y, zombie.width, zombie.height);
    }
    drawTower(tower, ctx) {
        ctx.fillStyle = 'gold';
        ctx.font = '20px Bungee Spice';
        ctx.fillText(Math.floor(tower.health), tower.x, tower.y+10);
        ctx.drawImage(tower.towersType, tower.spriteX * tower.spriteW, 0, tower.spriteW, tower.spriteH, tower.x, tower.y, tower.width, tower.height);
    }
    drawMoney(money,ctx) {
        ctx.drawImage(moneyImg, money.x, money.y, money.width, money.height);
        ctx.font = '20px Bungee Spice';
        ctx.fillText(money.amount, money.x + 15, money.y + 25);
    }
    drawBullet(bullet,ctx) {
        if (bullet.type) {
          ctx.fillStyle = 'grey';
        }
        else {
          ctx.fillStyle = 'brown';
        }
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.width, 0, Math.PI * 2);
        ctx.fill();
    }
    drawCell(cell,ctx) {
        if (collision(cell,cell.mouse)) {
          ctx.strokeStyle = 'black';
          ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
        }
    }
}

export default DrawEntities;