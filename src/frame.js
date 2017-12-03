'use strict';

function createFrame() {
    const rolls = [];

    function addRoll(roll) {
        if (rolls.length === 2) {
            throw new Error("Can't roll more than 2 times");
        }
        if (getResult() === 10) {
            throw new Error("Can't roll after strike");
        }
        return rolls.push(roll);
    }

    function getResult() {
        return rolls.reduce((previous, next) => {
            return previous + next;
        }, 0);
    }

    return { addRoll, getResult };
}

module.exports = {
    createFrame
};
