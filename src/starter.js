"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {parseSettings} from "./helper.js";

export function launch(f, window, document) {
    if (document.readyState !== "loading") {
        f(window, document);
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            f(window, document);
        });
    }
}

export function starter(window, document) {
    parseSettings(window, document, settings);

    if (settings.currentMode === "net") {
        import("./net_mode.js").then(netMode => {
            netMode.default(window, document, settings, gameFunction);
        });
    } else if (settings.currentMode === "server") {
        import("./serverMode.js").then(serverMode => {
            settings.color = "black";
            serverMode.default(window, document, settings);
        });
    } else if (settings.currentMode === "cheating") {
        Promise.all([
            import("./net_mode.js"),
            import("./ai.js")
        ]).then(([netMode, ai]) => {
            netMode.default(window, document, settings, gameFunction).then(game => {
                const aiBot = ai.default(game.getSolver());
                // game.on('aiHint', (matrix) => aiBot.makeMove(matrix, game.aiHint));
                game.on("meMove", (matrix) => aiBot.makeMove(matrix, game.aiHint));
                game.allCallbacksInited();
            });

        });
    } else {
        const game = gameFunction(window, document, settings);
        if (settings.currentMode === "ai") {
            import("./ai.js").then(ai => {
                const aiBot = ai.default(game.getSolver());
                game.on("aiMove", (matrix) => aiBot.makeMove(matrix, game.aiMove));
                game.on("aiHint", (matrix) => aiBot.makeMove(matrix, game.aiHint));
                game.allCallbacksInited();
            });
        } else if (settings.currentMode === "hotseat") {
            // do nothing
        }
        window.gameObj = game;
    }
}
