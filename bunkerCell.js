class BunkerCell {
  constructor(_x, _y, _size) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.intact = true;
    // cells have an intact, because I dont want to delete them in case I ever have a chance
    // for cells nearby to a hit cell to also be hit
  }

  show() {
    if (!this.intact) return;

    fill(0, 255, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  checkCollisionWithProjectile(projectile) {
    if (!this.intact) return false;

    if (projectile.x >= this.x && projectile.x <= this.x+this.size && projectile.y >= this.y && projectile.y <= this.y+this.size) {
      return true;
    }
    return false;
  }

  // checkCollisionWithAliens(army) {
  //   if (!this.intact) return false;

  //   for (let j = 0; j < army.cols; j++) {  // row
  //     for (let i = 0; i < army.aliens[j].length; i++) {  // col
  //       let alien = army.aliens[j][i];
  //       // version 1
  //       // if (alien.x >= this.x && alien.x <= this.x+this.size && alien.y >= this.y && alien.y <= this.y+this.size) {
  //       //   return true;
  //       // }
  //       // version 2
  //       // let x = this.x;
  //       // let y = this.y;
  //       // let s= this.size;
  //       // let ax = alien.x;
  //       // let ay = alien.y
  //       // let as = 35;
  //       // if (x >= ax && x <= ax+as && y >= ay && y <= ay+as) {
  //       //   return true;
  //       // }

  //       if (this.y < alien.y + alien.images[0].height) return true;
  //     }
  //   }
  //   return false;
  // }

  checkCollisionWithAliens(army) {
    if (!this.intact) return false;

    for (let j = 0; j < army.cols; j++) {  // row
      for (let i = 0; i < army.aliens[j].length; i++) {  // col
        let alien = army.aliens[j][i];
        let al = alien.x;
        let ar = alien.x + 40;
        let at = 0;  // we want any cell above the alient to be eliminated 
        let ab = alien.y + 40;

        let bl = this.x;
        let br = this.x + this.size;
        let bt = this.y;
        let bb = this.y + this.size;

        // if (RectA.X1 < RectB.X2 && RectA.X2 > RectB.X1 &&
        //   RectA.Y1 > RectB.Y2 && RectA.Y2 < RectB.Y1) 
        if (al < br && ar > bl && at < bb && ab > bt) {
          // console.log('cell checkCollisionWithAliens returning true');
          return true;
        }
        
      }
    }

    return false;
  }

}