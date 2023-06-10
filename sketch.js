// NOTE!!
// This program must be run with a local server (i.e. not just copying the path 
// of index.html and loading it into a browser).  This is because the loadImage()
// method will nt work without a server.  This is standard browser stuff. 

var army;
var alien1a_img, alien1b_img, alien2a_img, alien2b_img, alienExplode_img;
var alienSounds = [];
var alienSound0, alienSound1, alienSound2, alienSound3;
var alienKilledSound;
var shipBulletSound, shipExplosionSound;
var initialUpdateTime;
var ship;
var initalAlienChanceToShoot;

var alienExplosions = [];
var missiles = [];  // should be part of the ship class
var bunkers= [];

function preload() {
  // console.log(path);
  alien1a_img = loadImage("alien1a.jpg");
  alien1b_img = loadImage("alien1b.jpg");
  alien2a_img = loadImage("alien2a.jpg");
  alien2b_img = loadImage("alien2b.jpg");
  alienExplode_img = loadImage("explosionblue.png");
  alienSound0 = loadSound('sounds/0.wav');
  alienSound1 = loadSound('sounds/1.wav');
  alienSound2 = loadSound('sounds/2.wav');
  alienSound3 = loadSound('sounds/3.wav');
  alienSounds.push(alienSound0);
  alienSounds.push(alienSound1);
  alienSounds.push(alienSound2);
  alienSounds.push(alienSound3);
  alienKilledSound = loadSound('sounds/invaderkilled.wav');
  shipBulletSound = loadSound('sounds/bullet.wav');
  shipExplosionSound = loadSound('sounds/shipexplosion.wav');
}

function setup() {
  createCanvas(830, 600);
  alienExplode_img.resize(alien1a_img.width, alien1a_img.height);  // cannot be called in preload()
  army = new Army();
  ship = new Ship();
  bunkers.push(new Bunker(width/2-50, height - 110));
  bunkers.push(new Bunker(100, height - 110));
  bunkers.push(new Bunker(width-200, height - 110));
  initialUpdateTime = 1000;
  initalAlienChanceToShoot = 0.075;
  // frameRate(1);
}

function draw() {
  background(0);
  ship.update();
  ship.show();
  army.show();
  for (let m = 0; m < alienExplosions.length; m++){
    image(alienExplode_img, alienExplosions[m].x, alienExplosions[m].y);
  }
  for (bunker of bunkers) {
     bunker.show();
  }

  // move this code somewhere and call a funtion
  // MISSILES
  // Draw the missile, and check for collision with aliens or being offscreen
  for (let m = missiles.length-1; m >= 0; m--){
    missiles[m].update();
    missiles[m].show();
    
    // collision
    let deadMissile = false;
    if (army.checkHit(missiles[m])) {
      // console.log("sketch: hit army");
      deadMissile = true;
      missiles.splice(m, 1);
      alienKilledSound.setVolume(0.5);
      alienKilledSound.play();
    }

    // remove missiles off screen
    if (!deadMissile && missiles[m].y < -5) {
      missiles.splice(m, 1);
    }
  }

  // move this code somewhere and call a funtion
  // LASERS
  // Check for collision with ship
  for (let l = army.lasers.length-1; l >= 0; l--){
    army.lasers[l].update();
    army.lasers[l].show();

    // collision
    if (army.lasers[l].checkHitShip(ship)) {
      shipExplosionSound.setVolume(0.5);
      shipExplosionSound.play();
      textSize(128);
      fill(255, 0, 0);
      text('YOU LOSE', 100, 300);
      clearTimeout(army.timer);
      noLoop();
    }
  }  
  
  // move this code somewhere and call a funtion
  // BUNKER
  // Check for collision with missiles and lasers
  for (bunker of bunkers) {
    for (let l = army.lasers.length-1; l >= 0; l--){ 
      if (bunker.checkCollisionWithProjectile(army.lasers[l])) {
        army.lasers.splice(l, 1);
      }
    }
  }
  for (bunker of bunkers) {
    for (let m = missiles.length-1; m >= 0; m--){ 
      if (bunker.checkCollisionWithProjectile(missiles[m])) {
        missiles.splice(m, 1);
      }
    }
  }

  if (army.isDead()) {
    textSize(128);
    fill(0, 200, 0);
    text('WINNER', 150, 300);
    clearTimeout(army.timer);
    noLoop();
  }
}

// function mousePressed() {
//   missiles.push(new Missile(mouseX, mouseY));
// }

function keyPressed() {
  // Space means ship fire a missile.  Max of 3 at once.
  if (key === ' ') {
    if (missiles.length < 3) {
      missiles.push(new Missile(ship.x, ship.y));
      shipBulletSound.setVolume(0.5);
      shipBulletSound.play();
    }
  }

  // move the ship
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

