class Laser {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.speed = 4;
    this.len = 10;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    stroke(255, 0, 0);
    strokeWeight(4);
    line(this.x, this.y, this.x, this.y-this.len);
  }

  checkHitShip(ship) {
    let aw = ship.width;
    let ah = ship.height;
    let ax = ship.x-aw/2;
    let ay = ship.y-ah/2;
    let x = this.x;
    let y = this.y;

    if (x >= ax && x <= (ax+aw) && y >= ay && y <= (ay+ah)) {
      // console.log('hit alien');
      return true;
    }
  }

}