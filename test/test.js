var assert = require('assert');
var should = require('should');

var Game = require('../src/game');

describe('Game', function() {
  describe('#roll(pins)', function() {
    it('should return knocked down pins', function() {
      var game = new Game();
      game.roll(6).should.equal(6);
      game.roll(4).should.equal(4);
    });
    it('should not knock down negative pins', function() {
      var game = new Game();
      assert.throws(() => game.roll(-1), Error, "Can't roll negative");
    });
  });
});