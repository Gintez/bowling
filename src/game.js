'use strict';
const { createFrame } = require('./frame');
const { STRIKE, LAST_FRAME } = require('./constants');
const uuidv4 = require('uuid/v4');

function createGame({frames, currentFrameId } = { frames: [ createFrame({ id: 1 }) ], currentFrameId: 1 }) {
    
    let $frames = frames;
    let $currentFrameId = currentFrameId;

    function roll(pins) {
        validate(pins);
        getCurrentFrame().addRoll(pins);
        changeFrame();

        return pins;
    }

    function changeFrame() {
        if (shouldChangeFrame()) {
            $currentFrameId = $currentFrameId + 1;
            $frames.push(createFrame({ id: $currentFrameId }));
        }
    }

    function shouldChangeFrame() {
        return getCurrentFrame().isComplete() && $currentFrameId !== LAST_FRAME;
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
        return $frames.find((frame) => frame.getId() === $currentFrameId);
    }

    function isComplete() {
        return $currentFrameId === LAST_FRAME && getCurrentFrame().isComplete();
    }

    function getFrames() {
        return $frames.slice();
    }

    return { roll, getCurrentFrame, isComplete, getFrames };
}

module.exports = { createGame };