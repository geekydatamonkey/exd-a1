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
    
    it('should have a velocity vector of (0,0) by default', function(){
      expect(p.velocity).to.deep.equal({dx: 0, dy: 0});
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

    describe('update position', function(){
      it('should not change by default since theres no initial velocity', function(){
        let p2 = new Particle();
        p2.update();
        expect(p2.position).to.deep.equal(p.position);
      });
      it('should move horizontally correctly', function(){
        p.setVelocity([1,0]);
        expect(p.velocity).to.deep.equal({dx: 1, dy: 0});

        p.update();
        expect(p.position).to.deep.equal({x: 1, y: 0});
        p.update();
        expect(p.position).to.deep.equal({x: 2, y: 0});

        let p2 = new Particle({velocity: {dx: 5, dy: 0}});
        p2.update(5);
        expect(p2.position).to.deep.equal({x: 25, y: 0});

      });
      it('should move vertically correctly', function() {
        p.setVelocity({dx: 0, dy: 1});
        expect(p.velocity).to.deep.equal({dx: 0, dy: 1});

        p.update();
        expect(p.position).to.deep.equal({x: 0, y: 1});
        p.update();
        expect(p.position).to.deep.equal({x: 0, y: 2});

        let p2 = new Particle({velocity: {dx: 0, dy: 5}});
        p2.update(5);
        expect(p2.position).to.deep.equal({x: 0, y: 25});

      });
    });


  }); // end describe('particle')
})();
