// particle.js

'use strict';

const _  = require('lodash');

class Particle {

  constructor(config) {

    let defaults = {
      position: { x: 0, y: 0},
      radius: 1,
      velocity: {dx: 0, dy: 0}
    };

    // assume args are position if given 2 arguments
    if (arguments.length === 2) {
      config = {
        position: {
          x: arguments[0],
          y: arguments[1]
        }
      }
    }

    // merge defaults with config object
    config =  _.assign({}, defaults, config);

    this.position = config.position;
    this.radius = config.radius;
    this.velocity = config.velocity;
  }

  update(steps = 1) {
    for (let i = 0; i < steps; i++) {
      this.position.x += this.velocity.dx;
      this.position.y += this.velocity.dy;
    }

    return this;
  }

  setVelocity(dx, dy) {
    this.velocity.dx = dx;
    this.velocity.dy = dy;
    return this;
  }

  /**
  * current position as Array
  * @return Array
  **/
  getCenter() {
    return [this.position.x, this.position.y];
  }

  setPosition(x,y) {
    this.position.x = x;
    this.position.y = y;
    return this;
  }

  getRadius() {
    return this.radius;
  }

  setRadius(r) {
    this.radius = r;
  }

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
    let d = this.distanceTo(p2);
    let r1 = this.getRadius();
    let r2 = p2.getRadius();
    //console.log(`${d} <=? ${r1} + ${r2}`);
    return this.distanceTo(p2) <= this.radius + p2.radius;
  }

}

module.exports = Particle;