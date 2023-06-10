class Ship {
  constructor() {
    this.width = 40;
    this.height = 10
    this.x = width/2;
    this.y = height-this.height/2;
    this.dir = 0;
    this.speed = 3;
  }

  show() {
    noStroke();
    fill(0, 255, 0);
    rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    triangle(this.x-10, this.y, this.x + 10, this.y, this.x, this.y-20);

  }

  update() {
    this.x += this.dir*this.speed;
    this.x = constrain(this.x, this.width/2, width - this.width/2);
  }

  setDir(delta) {
    this.dir = delta;
  }

}