class Missile {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.speed = 3;
    this.len = 10;
  }

  update() {
    this.y -= this.speed;
  }

  show() {
    stroke(255);
    strokeWeight(4);
    line(this.x, this.y, this.x, this.y-this.len);
  }

  checkHitAlien(alien) {
    let aw = alien.images[0].width;
    let ah = alien.images[0].height;
    let ax = alien.x;
    let ay = alien.y;
    let x = this.x;
    let y = this.y;

    if (x >= ax && x <= (ax+aw) && y >= ay && y <= (ay+ah)) {
      // console.log('hit alien');
      return true;
    }
  }

}