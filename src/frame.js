'use strict';

const { STRIKE, LAST_FRAME } = require('./constants');

function createFrame(id) {
    const rolls = [];
    const $id = id;

    function addRoll(roll) {
        if (rolls.length === 2) {
            throw new Error("Can't roll more than 2 times");
        }
        if (getResult() === STRIKE) {
            throw new Error("Can't roll after strike");
        }
        return rolls.push(roll);
    }

    function getResult() {
        return rolls.reduce((previous, next) => {
            return previous + next;
        }, 0);
    }

    function getId() {
        return $id;
    }

    function isComplete() {
       return getResult() === STRIKE || rolls.length === 2;
    }

    return { addRoll, getResult, getId, isComplete };
}

module.exports = {
    createFrame
};
