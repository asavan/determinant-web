import placement from "./game.js";
import {defer} from "./helper.js";

function startGame(mode, startRed, myWorker) {
    let game = null;
    switch (mode) {
        case "net":
            game = placement(window, document, startRed, myWorker);
            break;
    }
    return game;
}

export {startGame};
