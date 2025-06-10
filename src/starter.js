"use strict";

import gameFunction from "./game.js";
import setupSettings from "./utils/setup-settings.js";

const aiHandler = (game, ai) => {
    const aiBot = ai.default(game.getSolver());
    game.on("aiMove", (matrix) => aiBot.makeMove(matrix, game.aiMove));
    game.on("aiHint", (matrix) => aiBot.makeMove(matrix, game.aiHint));
    return game.allCallbacksInited();
};

function starterInner(window, document, settings) {
    if (settings.mode === "net") {
        import("./modes/net.js").then(netMode => {
            netMode.default(window, document, settings, gameFunction)
                .then((game) => {
                    return game.allCallbacksInited();
                }).catch(() => {
                if (settings.modeGuessCount === 1) {
                    settings.mode = "ai";
                    settings.modeGuessCount = 2;
                    starterInner(window, document, settings);
                }
            }
            );
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
                game.on("aiHint", (matrix) => aiBot.makeMove(matrix, game.aiHint));
                game.on("meMove", (matrix) => aiBot.makeMove(matrix, game.aiHint));
                return game.allCallbacksInited();
            }).catch(() => {
                if (settings.modeGuessCount === 1) {
                    settings.mode = "ai";
                    settings.modeGuessCount = 2;
                    const game = gameFunction(window, document, settings);
                    aiHandler(game, ai);
                }
            }
            );
        });
    } else {
        const game = gameFunction(window, document, settings);
        if (settings.mode === "ai") {
            import("./modes/ai.js").then(ai => aiHandler(game, ai));
        } else if (settings.mode === "hotseat") {
            game.allCallbacksInited();
        }
        window.gameObj = game;
    }
}

export default function starter(window, document) {
    const settings = setupSettings(window);
    console.log("starter", settings);
    starterInner(window, document, settings);
}
