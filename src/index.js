import "./css/style.css";

import settings from "./settings.js";
import gameFunction from "./game.js";
import {ai} from "./ai.js";

function launch(f, window, document) {
    if( document.readyState !== 'loading' ) {
        f(window, document);
    } else {
        document.addEventListener("DOMContentLoaded", function (event) {
            f(window, document);
        });
    }
}

function install(window, document) {
    const btnAdd = document.querySelector('.butInstall');
    let deferredPrompt;
    btnAdd.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        // btnAdd.setAttribute('disabled', true);
        btnAdd.classList.add("hidden");
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((resp) => {
            console.log(JSON.stringify(resp));
        });
    });


    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-info bar from appearing.
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        // btnAdd.removeAttribute('disabled');
        btnAdd.classList.remove("hidden");
    });
    return btnAdd;
}

function starter(window, document) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const startRed = urlParams.get('startRed') ? !!JSON.parse(urlParams.get('startRed')) : settings.startRed;
    settings.startRed = startRed;
    settings.size = urlParams.get('size') ? parseInt(urlParams.get('size'), 10) : settings.size;
    settings.currentMode = urlParams.get('currentMode') || settings.currentMode;
    const game = gameFunction(window, document, settings);
    if (settings.currentMode === 'ai') {
        const aiBot = ai(game.getSolver(), game.aiMove);
        game.on('aiMove', (matrix)=> aiBot.makeMove(matrix));
    } else if (settings.currentMode === 'hotseat') {
        // TODO
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
