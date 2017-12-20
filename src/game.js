'use strict';
const { createFrame } = require('./frame');

function createGame() {

    let currentFrame = createFrame(1);

    function roll(pins) {
        validate(pins);
        currentFrame.addRoll(pins);
        if (currentFrame.getResult() === 10) {
            currentFrame = createFrame(2);
        }
        if (currentFrame.getCurrentRoll() === 2) {
            currentFrame = createFrame(2);
        }
        return pins;
    }

    function validate(pins) {
        if (pins < 0) {
            throw new Error("Can't roll negative");
        }
        if (pins > 10) {
            throw new Error("Can't roll more than 10");
        }
    }

    function getCurrentFrame() {
        return currentFrame.getId();
    }

    return { roll, getCurrentFrame }
}

module.exports = { createGame };