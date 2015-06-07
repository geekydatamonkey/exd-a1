// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let Particle = require('./particle');

let config = {
  parentClass: 'canvas-wrapper',
  canvas: {
    width: 710,
    height: 200
  },
  totalParticles: 10,
  color: {
    background: '#ffc',
    userParticle: 'red',
    defaultParticle: '#ccc'
  }
};


function mySketch(s){
  
  let particleList = [];
  let myParticle; // user controlled
  let paused = false;

  Particle.prototype.render = function(){
    if (this === myParticle) {
      this.color = config.color.userParticle;
    } else {
      this.color = config.color.defaultParticle;
    }
    s.fill(this.color);
    s.stroke(200);
    s.ellipseMode(s.RADIUS);
    s.ellipse(this.position.x, this.position.y, this.radius, this.radius);
  };

  s.setup = function (){
    s.createCanvas(700,200);
    s.background('#ffc');

    for (let i=0; i < config.totalParticles; i++) {
      let x = 40*i + 20;
      let y = s.height / 2;
      console.log(x,y);
      let p = new Particle(x,y);
      p.setRadius(10)
        .setVelocity(1,0)
        .setMaxPosition(s.width,s.height);
      particleList.push(p);
    }
    myParticle = particleList[0];
  };

  s.draw = function() {
    s.background(config.color.background);
    for (let i=0, len = particleList.length; i < len; i++) {
      let p = particleList[i];
      if (! paused) {
        p.update().render();
        console.log(`[${i}]: ${p.position.x}, ${p.position.y}`);
      }
    }  
  };

  s.keyTyped = function() {
    let p = myParticle;
    if (s.key === 'd') {
      p.accelerate(0.25,0);
    }
    if (s.key === 'a') {
      p.accelerate(-0.25,0);
    }
    if (s.key === '1') {
      p.setVelocity(1,0);
    }
    if (s.key === '0') {
      p.setVelocity(0,0);
    }
    if (s.key === ' ') {
      // pause
      paused = true;
    }

    return false;
  };

}


module.exports = new p5(mySketch);