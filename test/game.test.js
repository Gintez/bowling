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
            game.should.have.properties(['roll']);
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

