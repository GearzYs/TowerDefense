// This file contains the CanvasView class which is responsible for drawing the canvas and the grid on the canvas.

class CanvasView {
    constructor(canvas, ctx, cellSize, mouse, canvasPosition, gameGrid, Cell, grid) {
      if (CanvasView.instance) {
        return CanvasView.instance;
      }
      this.canvas = canvas;
      this.ctx = ctx;
      this.cellSize = cellSize;
      this.mouse = mouse;
      this.canvasPosition = canvasPosition;
      this.gameGrid = gameGrid;
      this.Cell = Cell;
      this.grid = grid;
      CanvasView.instance = this;
    }
  
    createGrid() {
      for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
        this.grid.y+=1;
        for (let x = 0; x < this.canvas.width; x += this.cellSize) {
          this.gameGrid.push(new this.Cell(x, y, this.cellSize, this.mouse));
        }
      }
    }

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawControlsBar() {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.cellSize);
    }
  
    handleMouseMove(e) {
      this.mouse.x = e.x - this.canvasPosition.left;
      this.mouse.y = e.y - this.canvasPosition.top;
    }
  
    handleMouseLeave() {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    }
  
    handleResize() {
      this.canvasPosition = this.canvas.getBoundingClientRect();
    }
  }
  
  export default CanvasView;
  