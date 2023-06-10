class Bunker {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.cells = [];  // doubly dimensioned array of BunkerCell
    this.cols = 6;
    this.rows = 10;
    this.cellSize = 10;

    for (let j = 0; j < this.cols; j++) {  // row
      let row = [];
      for (let i = 0; i < this.rows; i++) {  // col
        row.push(new BunkerCell(this.x + i*this.cellSize, this.y + j*this.cellSize, this.cellSize));
      }
      this.cells.push(row)
    }

  }

  show() {
    for (let j = 0; j < this.cols; j++) {  // row
      for (let i = 0; i < this.rows; i++) {  // col
        this.cells[j][i].show();
      }
    }
  }

  checkCollisionWithProjectile(projectile) {
    for (let j = 0; j < this.cols; j++) {  // row
      for (let i = 0; i < this.rows; i++) {  // col
         if (this.cells[j][i].checkCollisionWithProjectile(projectile)) {
          this.cells[j][i].intact = false;
          return true;
         }
      }
    }
    return false;
  }

}