// Display the game status on the screen

import collision from "../utilities/Collision.js";

class GameStatus {

    displayScore(ctx, score) {
        ctx.fillStyle = 'gold';
        ctx.font = '20px Bungee Spice';
        ctx.fillText('Score: ' + score, 0, 40);
    }

    displayLevel(ctx, level, canvas) {
        ctx.fillStyle = 'gold';
        ctx.font = '20px Bungee Spice';
        if (level>99) {
          ctx.fillText('Level: MAX', canvas.width - 150, 20);
        }
        else {
          ctx.fillText('Level: ' + level, canvas.width - 150, 20);
        }
    }

    diplayGameOver(ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.font = '90px Bungee Spice';
        ctx.fillText('GAME OVER', canvas.width / 4, canvas.height / 2);
    }

    displayWon(ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.font = '90px Bungee Spice';
        ctx.fillText('YOU WON', canvas.width / 4, canvas.height / 2);
    }

    displayNotEnoughMoney(ctx, numberOfMoney) {
        ctx.fillStyle = 'black';
        ctx.font = '25px Bungee Spice';
        ctx.fillText('Money: ' + numberOfMoney + "  NOT ENOUGH MONEY", 0, 20);
    }

    displayMoney(ctx, numberOfMoney) {
        ctx.fillStyle = 'gold';
        ctx.font = '25px Bungee Spice';
        ctx.fillText('Money: ' + numberOfMoney, 0, 20);
    }

    displayTowerChoose(ctx, mouse, fstTowerPlayer, sndTowerPlayer, towerChoose, cellSize) {
        ctx.lineWidth = 4;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        if (collision(mouse, fstTowerPlayer) || towerChoose === 0) {
          ctx.fillStyle = 'orange';
        }
        else {
          ctx.fillStyle = 'black';
        }
        ctx.fillRect(fstTowerPlayer.x, fstTowerPlayer.y, 50, 50);
        ctx.strokeRect(fstTowerPlayer.x, fstTowerPlayer.y, 50, 50);
        ctx.drawImage(fstTowerPlayer.img, 0, 0, fstTowerPlayer.width, fstTowerPlayer.height, fstTowerPlayer.x, fstTowerPlayer.y-20, cellSize, cellSize+20);
        if (collision(mouse, sndTowerPlayer)||towerChoose === 1) {
          ctx.fillStyle = 'orange';
        }
        else {
          ctx.fillStyle = 'black';
        }
        ctx.fillRect(sndTowerPlayer.x, sndTowerPlayer.y, 50, 50);
        ctx.strokeRect(sndTowerPlayer.x, sndTowerPlayer.y, 50, 50);
        ctx.drawImage(sndTowerPlayer.img, 0, 0, sndTowerPlayer.width, sndTowerPlayer.height, sndTowerPlayer.x, sndTowerPlayer.y-20, cellSize, cellSize+20);
      }
}

export default GameStatus;