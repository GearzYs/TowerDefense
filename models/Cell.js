// Model for the Cell object of the grid

class Cell {
    constructor(x, y, cellSize, mouse, collision) {
      this.x = x;
      this.y = y;
      this.width = cellSize;
      this.height = cellSize;
      this.mouse = mouse;
      this.collision = collision;
    }
  }
  
  export default Cell;
  