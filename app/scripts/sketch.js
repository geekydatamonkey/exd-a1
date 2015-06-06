// sketch.js
/*jshint newcap: false */

'use strict';
let p5 = require('p5');
let Particle = require('./particle');

let Sketch = new p5(function( sketch ) {

  let config = {
    parentClass: 'canvas-wrapper',
    canvas: {
      width: 710,
      height: 200
    },
    totalCars: 10
  };

  sketch.setup = function() {
    let canvasParent = document.getElementsByClassName(config.parentClass)[0];
    sketch.createCanvas(config.canvas.width, config.canvas.height).parent(canvasParent);
  };

  sketch.draw = function() {
   var h = sketch.frameCount % 360;
   sketch.fill(h, 100, 100);
   sketch.rect(0, 0, sketch.width, sketch.height);
  };
});

module.exports = Sketch;