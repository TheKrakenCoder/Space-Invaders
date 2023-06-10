class BunkerCell {
  constructor(_x, _y, _size) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.intact = true;

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


}