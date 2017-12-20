'use strict';

const assert = require('assert');
const should = require('should');

const {createFrame} = require('../src/frame');

describe('frame', function () {

    let frame;

    beforeEach(function () {
        frame = createFrame();
    });

    describe('#createFrame()', function () {
        it('should create a new frame', function () {
            frame.should.be.type('object');
            frame.should.have.properties(['addRoll', 'getResult', 'getId']);
        });
        describe('#addRoll()', function () {
            it('should return length of rolls', function () {
                let result = frame.addRoll(5);
                result.should.equal(1);
                result = frame.addRoll(4);
                result.should.equal(2);
            });
            it('should not allow more than two rolls', function () {
                frame.addRoll(1);
                frame.addRoll(2);
                assert.throws(() => frame.addRoll(3), Error, "Can't roll more than 2 times");
            });
            it('should not allow roll after strike', function () {
                frame.addRoll(10);
                assert.throws(() => frame.addRoll(1), Error, "Can't roll after strike");
            })
        });
        describe('#getResult()', function () {
            it('should return 0 without rolls', function () {
                frame.getResult().should.equal(0);
            });
            it('should return result after adding roll', function () {
                frame.addRoll(5);
                frame.getResult().should.equal(5);
            });
            it('should return the result after multiple rolls', function () {
                frame.addRoll(5);
                frame.addRoll(2);
                frame.getResult().should.equal(7);
            });
        });
        describe('#getId()', function () {
            it('should return frame id', function() {
                frame = createFrame(2);
                frame.getId().should.equal(2);
            });
        });
        // TODO: follow which roll it is for condition in game.js
        describe('#getCurrentRoll()', function () {
            it('should be 1 initially', function() {
                frame.getCurrentRoll().should.equal(1);
            });
            it('should be 2 after adding a roll', function() {
                frame.getCurrentRoll().should.equal(1);
            });
        });
    });
});