'use strict';

const assert = require('assert');
const should = require('should');

const { createGame } = require('../src/game');
const { STRIKE } = require('../src/constants');

describe('game', function () {
    let game;

    beforeEach(function () {
        game = createGame();
    });

    describe('#createGame()', function () {
        it('should create a new game', function () {
            game.should.be.type('object');
            game.should.have.properties(['roll', 'getCurrentFrame', 'isComplete', 'getFrames']);
        });
        describe('#getCurrentFrame()', function () {
            it('should initially be 1', function () {
                game.getCurrentFrame().getId().should.equal(1);
            });
            it('should be 2 after first strike', function () {
                game.roll(STRIKE);
                game.getCurrentFrame().getId().should.equal(2);
            });
            it('should be 1 after rolling once without strike', function () {
                game.roll(5);
                game.getCurrentFrame().getId().should.equal(1);
            });
            it('should be 2 after 2 rolls without strike', function () {
                game.roll(1);
                game.roll(8);
                game.getCurrentFrame().getId().should.equal(2);
            });
            it('should be 3 after 2 strikes', function () {
                game.roll(STRIKE);
                game.roll(STRIKE);
                game.getCurrentFrame().getId().should.equal(3);
            });
        });
        describe('#getFrames()', function() {
            it('should be 1 frame initially', function () {
                Array.isArray(game.getFrames()).should.equal(true);
                game.getFrames().length.should.equal(1);
            });
            it('should be 3 frames after 2 strikes', function () {
                game.roll(STRIKE);
                game.roll(STRIKE);
                game.getFrames().length.should.equal(3);
            });
        });
        describe('#isComplete()', function () {
            it('should be incomplete initially', function () {
                game.isComplete().should.equal(false);
            });
            it('should be incomplete after 2 strikes', function() {
                game.roll(STRIKE);
                game.roll(STRIKE);
                game.isComplete().should.equal(false);
            });
            it('should be complete after 20 rolls', function() {
                completeGame();
                game.isComplete().should.equal(true);
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
            it('should suggest new game when game is complete', function () {
                completeGame();
                assert.throws(() => game.roll(2), Error, "Game is complete. Start a new game")
            });
        });

        function completeGame() {
            [...new Array(20)].forEach(() => game.roll(2));
        }
    });
});

