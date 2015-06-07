'use strict';

let $ = require('jquery');

function setupKeypressHandlers() {
  let keyCodes = {
    up: 87,     // W
    left: 65,   // A
    down: 83,   // S 
    right: 68,  // D
    stop: 88,   // X
    pause: 32   // space
  };

  $(document).keydown(function(event){
    // loop through keycodes
    for (let key in keyCodes) {
      if (event.keyCode === keyCodes[key]){
        console.log(`Key DOWN: ${key}`);
        $('.key-' + key).addClass('is-pressed');
      }
    }
  });

  $(document).keyup(function(event){
    // loop through keycodes
    for (let key in keyCodes) {
      if (event.keyCode === keyCodes[key]){
        console.log(`Key UP: ${key}`);
        $('.key-' + key).removeClass('is-pressed');
      }
    }
  });
}

function init() {
  console.log('Setting up keyboard for instructions');
  setupKeypressHandlers();
}

module.exports = {
  init
};