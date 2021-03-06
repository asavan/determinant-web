"use strict";
import "./css/style.css";

import settings from "./settings.js";
import gameFunction from "./game.js";
import install from "./install_as_app.js";
import {parseSettings} from "./helper.js";

function launch(f, window, document) {
    if (document.readyState !== 'loading') {
        f(window, document);
    } else {
        document.addEventListener("DOMContentLoaded", function (event) {
            f(window, document);
        });
    }
}

function starter(window, document) {
    parseSettings(window, document, settings);
    settings.startRed = settings.color === 'red';

    if (settings.currentMode === 'net') {
        import("./net_mode.js").then(netMode => {
            netMode.default(window, document, settings, gameFunction);
        });
    } else {
        const game = gameFunction(window, document, settings);
        if (settings.currentMode === 'ai') {
            import("./ai.js").then(ai => {
                const aiBot = ai.default(game.getSolver());
                game.on('aiMove', (matrix) => aiBot.makeMove(matrix, game.aiMove));
                game.on('aiHint', (matrix) => aiBot.makeMove(matrix, game.aiHint));
                if (settings.startRed) {
                    game.forceAiMove();
                }
            });
        } else if (settings.currentMode === 'hotseat') {
            // do nothing
        }
        window.gameObj = game;
    }
}

launch(starter, window, document);

if (__USE_SERVICE_WORKERS__) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
        install(window, document);
    }
}
