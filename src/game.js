class Game {

    roll(pins) {
        if (pins < 0) {
            throw new Error("Can't roll negative");
        }

        return pins;
    }
}

module.exports = Game;