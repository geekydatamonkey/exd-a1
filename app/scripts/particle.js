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

  setVelocity(vector) {
    let v = this.velocity;
    if (Array.isArray(vector)){
      v.dx = vector[0];
      v.dy = vector[1];
    } else {
      v.dx = vector.dx;
      v.dy = vector.dy;
    }

    return this;
  }

  /**
  * current position as Array
  * @return Array
  **/
  getCoordinates() {
    return [this.position.x, this.position.y];
  }


}

module.exports = Particle;