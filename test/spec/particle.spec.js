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

    it('should allow initial position to be set at instantiation', function() {
      let p1 = new Particle(-5,10);
      expect(p1.position).to.deep.equal({x:-5, y:10});
    });

    describe('update position', function(){
      it('should not change by default since theres no initial velocity', function(){
        let p2 = new Particle();
        p2.update();
        expect(p2.position).to.deep.equal(p.position);
      });
      it('should move horizontally correctly', function(){
        p.setVelocity(1,0);
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
        p.setVelocity(0, 1);
        expect(p.velocity).to.deep.equal({dx: 0, dy: 1});

        p.update();
        expect(p.position).to.deep.equal({x: 0, y: 1});
        p.update();
        expect(p.position).to.deep.equal({x: 0, y: 2});

        let p2 = new Particle({velocity: {dx: 0, dy: 5}});
        p2.update(5);
        expect(p2.position).to.deep.equal({x: 0, y: 25});

      });

      it('should handle diagonal movements too', function(){
        p.setVelocity(3, 4);
        p.update(5);
        expect(p.getCenter()).to.deep.equal([15,20]);
      });

      xit('should fail if setVelocity gets invalid args', function() {
        let fn = p.setVelocity.bind(p); 
        // bind() undefined on PhantomJS?
        expect(fn).to.throw(TypeError);
      })
    });

    describe('collision detection', function() {
      it('should measure distance between center and a given point',function(){

        let d = Math.sqrt(5*5 + 5*5);
        expect(p.distanceTo(5,5)).to.equal(d);

        // between (-5,10) and (4, 7.5)
        let dx = (4 - (-5));
        let dy = (7.5 - 10);
        d = Math.sqrt(dx*dx + dy*dy);

        let p1 = new Particle(-5,10);
        let p2 = new Particle(4,7.5);
        expect(p1.distanceTo(p2)).to.equal(d);


      })
      it('should check if its colliding with another particle', function() {

        // no particle collides with itself
        expect(p.isCollidingWith(p)).to.be.false;

        // (0,0) and (0,0) but distinct particles
        let p2 = new Particle();
        expect(p.isCollidingWith(p2)).to.be.true;

        // (0,0) and (1,1)
        let p3 = new Particle();
        p3.setPosition(1,1);
        expect(p.isCollidingWith(p3)).to.be.true;

        // (-3,5) and (5,3)
        let p4 = new Particle();
        p4.setPosition(-3,5);
        let p5 = new Particle();
        p5.setPosition(5,3);
        expect(p4.isCollidingWith(p5)).to.be.false;

      });
    })


  }); // end describe('particle')
})();
