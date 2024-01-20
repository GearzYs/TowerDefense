// OBSERVER | This module implements the GameOverObserver class to check if the game is over.

class GameOverObserver {

    checkGameOver(gameOver, zombie) {
        if (zombie.x < 0) {
            gameOver = true;
            return gameOver;
        }
        else {
            return gameOver;
        }
    }
}

export default GameOverObserver;