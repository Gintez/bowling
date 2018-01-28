const express = require("express");
const gameService = require("gameService");

const gameController = express();

gameController.post('/',(request, response) => {
    response.send("Work in progress");
});

module.exports = gameController;