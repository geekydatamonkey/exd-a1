// particle.js

'use strict';

const _  = require('lodash');

class Particle {

  constructor(config) {
    let defaults = {
      position: { x: 0, y: 0},
      radius: 1,
      velocity: 1
    };

    // merge defaults with config object
    config =  _.assign({}, defaults, config);

    this.position = config.position;
    this.radius = config.radius;
    this.velocity = config.velocity;
  }

}

module.exports = Particle;