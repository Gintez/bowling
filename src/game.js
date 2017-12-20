'use strict';
const { createFrame } = require('./frame');
const { STRIKE, LAST_FRAME } = require('./constants');

function createGame() {

    let currentFrame = createFrame(1);

    function roll(pins) {
        validate(pins);
        currentFrame.addRoll(pins);
        changeFrame();

        return pins;
    }

    function changeFrame() {
        if (shouldChangeFrame()) {
            currentFrame = createFrame(getCurrentFrame() + 1);
        }
    }

    function shouldChangeFrame() {
        return currentFrame.isComplete() && getCurrentFrame() !== LAST_FRAME;
    }

    function validate(pins) {
        if (pins < 0) {
            throw new Error("Can't roll negative");
        }
        if (pins > STRIKE) {
            throw new Error("Can't roll more than 10");
        }
    }

    function getCurrentFrame() {
        return currentFrame.getId();
    }

    function isComplete() {
        return getCurrentFrame() === LAST_FRAME && currentFrame.isComplete();
    }

    return { roll, getCurrentFrame, isComplete }
}

module.exports = { createGame };