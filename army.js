class Army {
  constructor(x, y, imgNum) {
    this.aliens = [];  // actually an array of arrays
    this.cols = 4;
    this.rows = 11;
    // this.cols = 1;
    // this.rows = 1;
    this.dir = 1;
    this.deltaX = 20;
    this.deltaY = 50;
    this.imageWidthPlusBuffer = 60;
    this.soundIndex = 0;
    this.timer = undefined;
    this.lasers = [];
    // this.updatetime = 1000;

    for (let j = 0; j < this.cols; j++) {  // row
      let alienr = [];
      let w = this.imageWidthPlusBuffer;
      for (let i = 0; i < this.rows; i++) {  // col
        // alienr.push(new Alien(w + i*w, 50+j*50, j%2));
        alienr.push(new Alien(w + i*w, j*50, j%2));
      }
      this.aliens.push(alienr)
    }

    this.update();
  }

  update() {
    // console.log(updateTime);
    // Find the leftmost and rightmost aliens
    let rightX = 0;
    let leftX = width;
    let deltaY = 0;
    let deltaX = 0;
    let numAliens = 0;
    for (let j = 0; j < this.cols; j++) {  // row
      for (let i = 0; i < this.aliens[j].length; i++) {  // col
        let alien = this.aliens[j][i];
        if (alien.x > rightX) rightX = alien.x;
        if (alien.x < leftX)  leftX  = alien.x;
        numAliens++;
      }
    }

    // check if we've hit the edge
    if (this.dir === 1 && rightX > width-this.imageWidthPlusBuffer) {
      this.dir = -1;
      deltaY = this.deltaY;
      deltaX = this.deltaX;  // when we change direction, only the y changes, the x stays the same
    }
    if (this.dir === -1 && leftX < this.deltaX) {
      this.dir = 1;
      deltaY = this.deltaY;
      deltaX = -this.deltaX;
    }

    // move every alien and possibly have it shoot a laser
    for (let j = 0; j < this.cols; j++) {  // row
      for (let i = 0; i < this.aliens[j].length; i++) {  // col
        this.aliens[j][i].update(deltaX + this.dir*this.deltaX, deltaY);
        let shootChance = map(numAliens, 0, this.cols*this.rows, alienChanceToShoot*alienChanceToShootScale, alienChanceToShoot);
        if (random() < shootChance) {
          let xoff = 20 + random(-10, 10)
          this.lasers.push(new Laser(this.aliens[j][i].x+xoff, this.aliens[j][i].y))
        }
      }
    }
    
    // play the appropriate move sound
    alienSounds[this.soundIndex].setVolume(0.2);
    alienSounds[this.soundIndex].play();
    this.soundIndex++;
    if (this.soundIndex >= alienSounds.length) this.soundIndex = 0;

    // reset the exploded aliens
    alienExplosions = [];

    // set a timeout to call this method again
    let updateTime = map(numAliens, 0, this.cols*this.rows, initialUpdateTime/10, initialUpdateTime);
    this.timer = setTimeout(this.update.bind(this), updateTime);
    numUpdates += 1;

    // updateTime = updateTime - 100;
  }

  show() {
    for (let j = 0; j < this.cols; j++) {  // row
      for (let i = 0; i < this.aliens[j].length; i++) {  // col
        this.aliens[j][i].show();
      }
    }
  }

  // delete hit aliens
  checkHit(missile) {
    for (let j = 0; j < this.cols; j++) {  // row
      // since we may change the length of the array, calculate it beforehand
      let rows = this.aliens[j].length;
      for (let i = rows-1; i >= 0; i--) {  // col
        if (missile.checkHitAlien(this.aliens[j][i]) ) {
          alienExplosions.push(this.aliens[j][i]);
          this.aliens[j].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  isDead() {
    for (let j = 0; j < this.cols; j++) {  // row
      if (this.aliens[j].length > 0) {
        return false
      }
    }
    return true;
  }

  reachedBottom() {
    for (let j = 0; j < this.cols; j++) {  // row
      let rows = this.aliens[j].length;
      for (let i = rows-1; i >= 0; i--) {  // col
        if (this.aliens[j][i].y > height-50) {
          return true;
        }
      }
    }
    return false;
  }

  // having this function and reachedBottom is redundant.
  // this function couls also start at the bottom to be more efficient
  lowestAlienBottom() {
    let lowestAlienY = 0;
    for (let j = 0; j < this.cols; j++) {  // row
      let rows = this.aliens[j].length;
      for (let i = rows-1; i >= 0; i--) {  // col
        if (this.aliens[j][i].y > lowestAlienY) {
          lowestAlienY =  this.aliens[j][i].y;
        }
      }
    }
    return lowestAlienY;
  }

}