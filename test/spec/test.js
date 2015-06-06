/* global describe, it */


(function () {
  'use strict';

  describe('Assignment 1', function () {

    describe('particle', function () {
      var Particle = require('../../app/scripts/particle');
      it('should create a new particle at (0,0) with radius 1', function(){
        var p = new Particle();
        expect(p).to.be.instanceof(Particle);
        expect(p.position).to.be.deep.equal({x:0, y:0});

      });

    });
  });
})();
