'use strict';

const { STRIKE, LAST_FRAME } = require('./constants');

function createFrame(id) {
    const rolls = [];
    const $id = id;

    function addRoll(roll) {
        validate();
        return rolls.push(roll);
    }

    function validate() {
        if (isRolledTwice()) {
            throw new Error("Can't roll more than 2 times");
        }
        if (isStrike()) {
            throw new Error("Can't roll after strike");
        }
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
       return isStrike() || isRolledTwice();
    }

    function isRolledTwice() {
        return rolls.length === 2;
    } 

    function isStrike() {
        return getResult() === STRIKE;
    }

    return { addRoll, getResult, getId, isComplete };
}

module.exports = {
    createFrame
};
