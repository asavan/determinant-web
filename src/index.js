import "./css/style.css";

import settings from "./settings.js";
import gameFunction from "./game.js";

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
    const startRed = urlParams.get('startRed') ? !!JSON.parse(urlParams.get('startRed')) : false;
    settings.startRed = startRed;
    window.gameObj = gameFunction(window, document, settings);
}

launch(starter, window, document);

if (__USE_SERVICE_WORKERS__) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
        install(window, document);
    }
}
