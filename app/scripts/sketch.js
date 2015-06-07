// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let Particle = require('./particle');
let _ = require('lodash');
let $ = require('jquery');

let config = {
  canvasWrapper: '.canvas-wrapper',
  totalParticles: 10,
  color: {
    background: '#ffe',
    userParticle: 'blue',
    defaultParticle: '#ccc',
    collision: 'magenta'
  }
};

function mySketch(s){
  
  let particleList = [];
  let myParticle; // user controlled
  let paused = false;

  /**
  * decides which color to use for this particle
  **/
  Particle.prototype.updateColor = function() {

    // user particle
    if (this === myParticle) {
      this.color = config.color.userParticle;
      return;
    }

    // colliding particle
    if (this.checkCollisions(particleList)){
      this.color = config.color.collision;
      return;
    } 

    // default particle
    this.color = config.color.defaultParticle;
  }

  /**
  * Augment particles with a render method
  **/
  Particle.prototype.render = function(){
    this.updateColor();
    s.fill(this.color);
    s.stroke(200);
    s.ellipseMode(s.RADIUS);
    s.ellipse(this.position.x, this.position.y, this.radius, this.radius);
  };

  s.setup = function (){

    let $canvasWrapper = $(config.canvasWrapper);

    // put in canvasWrapper
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    s.background('#ffc');

    for (let i=0; i < config.totalParticles; i++) {
      let x = 40*i + 20;
      let y = s.height / 2;
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
      }
    }  
  };

  s.keyPressed = function() {
    //console.log(`keyCode: ${s.keyCode}, key: ${s.key}`);

    let p = myParticle;
    let unit = 0.25;
    let keys = {
      right: ['D', s.RIGHT_ARROW],
      left: ['A', s.LEFT_ARROW],
      up: ['W', s.UP_ARROW],
      down: ['S', s.DOWN_ARROW],
      stop: ['0'],
      pause: [' ']
    };


    // checks if key is contained
    // within given array
    function keyIsIn(array) {
      let regexASCII = /[A-Z0-9]/;
      
      // if ASCII, use s.key
      if (s.key.match(regexASCII)) {
        return _.includes(array,s.key);
      }

      // otherwise check keyCode
      return  _.includes(array,s.keyCode);
    }

    // right
    if (keyIsIn(keys.right)) {
      p.accelerate(unit,0);
    }
    
    // left
    if (keyIsIn(keys.left)) { 
      p.accelerate(-1 * unit,0);
    }
    
    // up -- origin is top, left, so negative
    if (keyIsIn(keys.up)) { 
      p.accelerate(0, -1 *unit); 
    }
    
    // down
    if (keyIsIn(keys.down)) {
      p.accelerate(0, unit); 
    }
    
    // stop
    if (keyIsIn(keys.stop)) {
      p.setVelocity(0,0);
    }
    
    // pause
    if (keyIsIn(keys.pause)) {
      paused = true; 
    }

    return false;
  };

}


module.exports = new p5(mySketch);