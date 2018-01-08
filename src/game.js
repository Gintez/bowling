'use strict';
const { createFrame } = require('./frame');
const { STRIKE, LAST_FRAME } = require('./constants');

function createGame() {

    let currentFrame = createFrame(1);
    const frames = [ currentFrame ];

    function roll(pins) {
        validate(pins);
        currentFrame.addRoll(pins);
        changeFrame();

        return pins;
    }

    function changeFrame() {
        if (shouldChangeFrame()) {
            currentFrame = createFrame(getCurrentFrame() + 1);
            frames.push(currentFrame);
        }
    }

    function shouldChangeFrame() {
        return currentFrame.isComplete() && getCurrentFrame() !== LAST_FRAME;
    }

    function validate(pins) {
        if (isComplete()) {
            throw new Error("Game is complete. Start a new game");
        }
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

    function getFrames() {
        return frames.slice();
    }

    return { roll, getCurrentFrame, isComplete, getFrames };
}

class SimpleDate {

    constructor(day) {
        // Check that (year, month, day) is a valid date
        // ...

        // If it is, use it to initialize "this" date;
        this._day = day;
    }
}

module.exports = { createGame, SimpleDate };