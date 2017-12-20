'use strict';

const assert = require('assert');
const should = require('should');

const {createFrame} = require('../src/frame');
const {STRIKE} = require('../src/constants');


describe('frame', function () {

    let frame;

    beforeEach(function () {
        frame = createFrame();
    });

    describe('#createFrame()', function () {
        it('should create a new frame', function () {
            frame.should.be.type('object');
            frame.should.have.properties(['addRoll', 'getResult', 'getId', 'isComplete']);
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
                frame.addRoll(STRIKE);
                assert.throws(() => frame.addRoll(1), Error, "Can't roll after strike");
            });
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
        describe('#isComplete()', function () {
            it('should be false initially', function() {
                frame.isComplete().should.equal(false);
            });
            it('should be false after rolling 6', function() {
                frame.addRoll(6);
                frame.isComplete().should.equal(false);
            });
            it('should be true after rolling strike', function() {
                frame.addRoll(STRIKE);
                frame.isComplete().should.equal(true);
            });
            it('should be true after rolling twice', function() {
                frame.addRoll(5);
                frame.addRoll(4);
                frame.isComplete().should.equal(true);
            });
        });
    });
});