/* global describe, it */

(function () {
  'use strict';

  describe('particle', function () {
    let Particle = require('../../app/scripts/particle');

    let p;

    beforeEach(function(){
      p = new Particle();
    });

    it('should create a new particle', function(){
      expect(p).to.be.instanceof(Particle);
    });

    it('should have default position of (0,0)', function(){
      expect(p.position).to.deep.equal({x:0, y:0});
    });
    
    it('should have a default radius of 1', function() {
      expect(p.radius).to.equal(1);
    });
    
    it('should have a velocity of 1 by default', function(){
      expect(p.velocity).to.equal(1);
    });
    
    it('should allow initial config of particle at instantiation', function(){
      var config = {
        position: {
          x: 10,
          y: 20
        }
      };     
      let p2 = new Particle(config);   

      // position should be new
      expect(p2.position).to.deep.equal({x: 10, y: 20});
      // while other properties should be default
      expect(p2.velocity).to.deep.equal(p.velocity);
      expect(p2.radius).to.deep.equal(p.radius);
    });
  }); // end describe('particle')
})();
