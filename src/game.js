'use strict';

function createGame() {

    function roll(pins) {
        validate(pins);
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

    return { roll }
}

module.exports = { createGame };