// This snippet from utilities/GameOverObserver.js:

const amounts = [20, 25, 30, 35, 40];
class Money {

  constructor(cellSize, canvaswidth, grid) {
    this.cellSize = cellSize;
    this.canvaswidth = canvaswidth;
    this.x = Math.random() * (canvaswidth - cellSize);
    this.y = (Math.floor(Math.random() * grid.y) + 1) * cellSize;
    this.amount = amounts[Math.floor(Math.random() * amounts.length)];
    this.width = cellSize * 0.5;
    this.height = cellSize * 0.5;
  }
}

export default Money;
