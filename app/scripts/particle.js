// particle.js

'use strict';

const _  = require('lodash');

// a better behaving modulo
// handles negatives correctly
function mod(n,m) {
  return ((n%m)+m)%m;
}


/**
* 2D Particles for simple movement
* particles are circular objects
* with a position and velocity
* @class Particle
*/
class Particle {

  /**
  * Creates a new Particle.
  **/
  constructor(config) {

    let defaults = {
      position: { x: 0, y: 0},
      radius: 1,
      velocity: {dx: 0, dy: 0},
      max: {x: 1000, y: 1000}
    };

    // assume args are position if given 2 arguments
    if (arguments.length === 2) {
      config = {
        position: {
          x: arguments[0],
          y: arguments[1]
        }
      };
    }

    // merge defaults with config object
    config =  _.assign({}, defaults, config);

    this.position = config.position;
    this.radius = config.radius;
    this.velocity = config.velocity;
    this.max = config.max;
  }

  /**
  * updates the particle to its next position
  **/
  update(steps = 1) {

    for (let i = 0; i < steps; i++) {
      this.position.x = mod(this.position.x + this.velocity.dx, this.max.x);
      this.position.y = mod(this.position.y + this.velocity.dy, this.max.y);
    }

    return this;
  }

  /**
  * sets the particles x and y velocities
  **/
  setVelocity(dx, dy) {
    this.velocity.dx = dx;
    this.velocity.dy = dy;
    return this;
  }

  setMaxPosition(maxX,maxY) {
    this.max.x = maxX;
    this.max.y = maxY;
    return this;
  }

  /**
  * increases velocity
  **/
  accelerate(ddx, ddy) {
    this.velocity.dx += ddx;
    this.velocity.dy += ddy;
    return this;
  }

  /**
  * current position as Array
  * @return Array
  **/
  getPosition() {
    return [this.position.x, this.position.y];
  }

  /**
  * Alias for getPosition
  **/
  getCenter() {
    return this.getPosition();
  }

  /**
  * Sets the position (center)
  **/
  setPosition(x,y) {
    this.position.x = mod(x,this.max.x);
    this.position.y = mod(y,this.max.y);
    return this;
  }

  /**
  * gets this particle's radius
  **/
  getRadius() {
    return this.radius;
  }

  /**
  * sets the radius
  **/ 
  setRadius(r) {
    this.radius = r;
    return this;
  }

  /**
  * gets the distance to coordiates
  * alternately if only one argument (another particle)
  * is provided, this will return the distance from this
  * particle's center to the other particle's center
  **/
  distanceTo(x,y) {

    // if x is an object, then another particle
    // was given, so we find the center
    if (x instanceof Particle) {
      let p = x;
      x = p.position.x;
      y = p.position.y;
    }

    let deltaX = x - this.position.x;
    let deltaY = y - this.position.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  /**
  * checks if this particle is colliding with another
  * given particle.
  **/
  isCollidingWith(p2) {
    // no particle collides with itself
    if (this === p2) {
      return false;
    }
    // the distance between the center of this particle
    // and the center of p2 must be greater than
    // the radius of this + the radius of p2
    // if it's not colliding
    // console.log(`${d} <=? ${r1} + ${r2}`);
    return this.distanceTo(p2) <= this.radius + p2.radius;
  }

}

module.exports = Particle;