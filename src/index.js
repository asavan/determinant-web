"use strict";
import "./css/style.css";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {ai} from "./ai.js";
import netMode from "./net_mode.js";
import install from "./install_as_app.js";

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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const color = urlParams.get('color') || 'blue';
    const startRed = color === 'red';
    settings.startRed = startRed;
    settings.size = urlParams.get('size') ? parseInt(urlParams.get('size'), 10) : settings.size;
    settings.currentMode = urlParams.get('currentMode') || settings.currentMode;
    const game = gameFunction(window, document, settings);
    if (settings.currentMode === 'ai') {
        const aiBot = ai(game.getSolver());
        game.on('aiMove', (matrix) => aiBot.makeMove(matrix, game.aiMove));
        game.on('aiHint', (matrix) => aiBot.makeMove(matrix, game.aiHint));
    } else if (settings.currentMode === 'hotseat') {
        // do nothing
    } else if (settings.currentMode === 'net') {
        netMode(window, document, settings, urlParams, game);
    }
    window.gameObj = game;
}

launch(starter, window, document);

if (__USE_SERVICE_WORKERS__) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
        install(window, document);
    }
}
