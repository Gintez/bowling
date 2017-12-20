'use strict';

const assert = require('assert');
const should = require('should');

const {createGame} = require('../src/game');

describe('game', function () {
    let game;

    beforeEach(function () {
        game = createGame();
    });

    describe('#createGame()', function () {
        it('should create a new game', function () {
            game.should.be.type('object');
            game.should.have.properties(['roll', 'getCurrentFrame']);
        });
        describe('#getCurrentFrame()', function () {
            it('should initially be 1', function () {
                game.getCurrentFrame().should.equal(1);
            });
            it('should be 2 after first strike', function () {
                game.roll(10);
                game.getCurrentFrame().should.equal(2);
            });
            it('should be 1 after rolling once without strike', function () {
                game.roll(5);
                game.getCurrentFrame().should.equal(1);
            });
            it('should be 2 after 2 rolls without strike', function () {
                game.roll(1);
                game.roll(8);
                game.getCurrentFrame().should.equal(2);
            });
        });
        describe('#roll(pins)', function () {
            it('should return knocked down pins', function () {
                game.roll(6).should.equal(6);
                game.roll(4).should.equal(4);
            });
            it('should not knock down negative pins', function () {
                assert.throws(() => game.roll(-1), Error, "Can't roll negative");
            });
            it('should not knock down more than 10', function () {
                assert.throws(() => game.roll(11), Error, "Can't roll more than 10");
            });
        });
    });
});

