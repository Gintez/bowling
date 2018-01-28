const express = require("express");
const gameController = require("./src/gameController");

const app = express();

express.json();

app.use("/api", gameController);

app.listen(3000, function() {
    console.log("Bowling app listening on port 3000")
}); 