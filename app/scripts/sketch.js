// sketch.js

'use strict';
let p5 = require('p5');

let myp5 = new p5(function( sketch ) {
  sketch.setup = function() {
    let cnv = sketch.createCanvas(500, 500);
    sketch.colorMode(sketch.HSB, 360, 100, 100);
    sketch.noStroke();
  };

  sketch.draw = function() {
   var h = sketch.frameCount % 360;
   sketch.fill(h, 100, 100);
   sketch.rect(0, 0, sketch.width, sketch.height);
  };
});