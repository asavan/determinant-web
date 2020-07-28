import "./css/style.css";

import settings from "./settings.js";
import {startGame} from "./starter.js";


function launch(f) {
    if( document.readyState !== 'loading' ) {
        f();
    } else {
        document.addEventListener("DOMContentLoaded", function (event) {
            f();
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

function starter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const startRed = urlParams.get('startRed') ? !!JSON.parse(urlParams.get('startRed')) : false;
    let myWorker = null;
    if (window.Worker) {
        myWorker = new Worker("worker.js");
    }

    const game = startGame(settings.currentMode, startRed, myWorker);
}

launch(starter);

if (__USE_SERVICE_WORKERS__) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
        install(window, document);
    }
}

/*
(function (window, document) {

    try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const startRed = urlParams.get('startRed') ? !!JSON.parse(urlParams.get('startRed')) : false;
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js', {scope: './'});
            install(window, document);
        }
        let myWorker = null;
        if (window.Worker) {
            myWorker = new Worker("worker.js");
        }
        window.gameObj = game(window, document, startRed, myWorker);
    } catch (e) {
        console.log(e);
    }
})(window, document);

function install(window, document) {
    const btnAdd = document.getElementById('butInstall');
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
}


 */