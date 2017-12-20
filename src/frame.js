'use strict';

function createFrame(id) {
    const rolls = [];
    const $id = id;

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

    function getId() {
        return $id;
    }

    return { addRoll, getResult, getId };
}

module.exports = {
    createFrame
};
