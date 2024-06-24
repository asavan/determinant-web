"use strict";

import settings from "./settings.js";
import gameFunction from "./game.js";
import { parseSettings } from "./utils/parse-settings.js";


export default function starter(window, document) {
    parseSettings(window.location.search, settings);

    if (settings.mode === "net") {
        import("./modes/net.js").then(netMode => {
            netMode.default(window, document, settings, gameFunction);
        });
    } else if (settings.mode === "server") {
        import("./modes/server.js").then(serverMode => {
            settings.color = "black";
            serverMode.default(window, document, settings);
        });
    } else if (settings.mode === "cheating") {
        Promise.all([
            import("./modes/net.js"),
            import("./modes/ai.js")
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
        if (settings.mode === "ai") {
            import("./modes/ai.js").then(ai => {
                const aiBot = ai.default(game.getSolver());
                game.on("aiMove", (matrix) => aiBot.makeMove(matrix, game.aiMove));
                game.on("aiHint", (matrix) => aiBot.makeMove(matrix, game.aiHint));
                game.allCallbacksInited();
            });
        } else if (settings.mode === "hotseat") {
            // do nothing
        }
        window.gameObj = game;
    }
}
