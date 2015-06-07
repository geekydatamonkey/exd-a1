// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let Particle = require('./P5Particle');
let _ = require('lodash');
let $ = require('jquery');

let config = {
  canvasWrapper: '.canvas-wrapper',
  totalParticles: 10,
  color: {
    background: '#ffe'
  }
};

function mySketch(s){
  
  let particleList = [];
  let myParticle; // user controlled
  let paused = false;

  s.setup = function (){

    let $canvasWrapper = $(config.canvasWrapper);

    // put in canvasWrapper
    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    s.background('#ffc');

    for (let i=0; i < config.totalParticles; i++) {
      let settings = {
        position: {
          x: 40*i + 20,
          y: s.height / 2
        },
        sketch: s
      };

      let p = new Particle(settings);
      console.log(p);

      p.setRadius(10)
       .setVelocity(1,0)
       .setMaxPosition(s.width,s.height);
      
      particleList.push(p);
    }

    // make first particle controllable by user
    myParticle = particleList[0];
    myParticle.setUserControlled(true);
  };

  s.draw = function() {
    s.background(config.color.background);
    for (let i=0, len = particleList.length; i < len; i++) {
      let p = particleList[i];
      if (! paused) {
        p.update(particleList).render(s);
      }
    }  
  };

  s.keyPressed = function() {

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