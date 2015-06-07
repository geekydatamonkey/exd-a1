// particle.p5

let p5 = require('p5');
let Particle = require('./particle');

let config = {
  color: {
    userParticle: 'blue',
    defaultParticle: '#ccc',
    collision: 'magenta'
  }
};

class P5Particle extends Particle {

  constructor(conf) {
    super(conf);
    this.sketch = conf.sketch;
    this.userControlled = false;
  }

  setUserControlled(bool) {
    this.userControlled = bool;
    return this;
  }

  isUserControlled() {
    return this.userControlled;
  }


  updateColor(particleList, checkCollisions = true) {
    // user particle
    if (this.isUserControlled()) {
      this.color = config.color.userParticle;
      return this;
    }

    // colliding particle
    if (checkCollisions) {
      if (! particleList) {
        throw "No Particle List given for collission checking";
      }
      if (this.checkCollisions(particleList)) {
        this.color = config.color.collision;
        return this;
      }
    } 

    // default particle
    this.color = config.color.defaultParticle;
  }

  update(particleList) {
    super.update();
    this.updateColor(particleList);
    return this;
  }

  render(P5sketch) {
    let s = P5sketch;
    s.fill(this.color);
    s.stroke(200);
    s.ellipseMode(s.RADIUS);
    s.ellipse(this.position.x, this.position.y, this.radius, this.radius);
    return this;
  };

}

module.exports = P5Particle;