class Alien {
  constructor(x, y, imgNum) {
    // x and y are pixel locations
    this.x = x;
    this.y = y;
    // this.alive = true;
    this.images = [];
    if (imgNum === 1) {
      this.images.push(alien1a_img);
      this.images.push(alien1b_img);
    } else {
      this.images.push(alien2a_img);
      this.images.push(alien2b_img);
    }
    this.curImage = 0;
  }

  update(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.curImage = 1 - this.curImage;
  }

  show() {
    // if (this.alive) {
      noStroke();
      fill(255);
      image(this.images[this.curImage], this.x, this.y);
    // }
  }

}
