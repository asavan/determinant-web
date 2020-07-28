"use strict"; // jshint ;_;
import {solverFunc} from "./solver.js";
import {presenterFunc} from "./presenter.js";
import {ai} from "./ai.js";

const handleClick = function (evt, parent) {
    const getIndex = function (e, parent) {
        const target = e.target || e.srcElement;
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === target) return i;
        }
        return -1;
    };

    evt.preventDefault();
    if (!(evt.target.classList.contains('cell') || evt.target.classList.contains('digit'))) {
        return;
    }
    return getIndex(evt, parent);
};

function draw(presenter, box, digits) {
    for (let i = 0; i < presenter.matrix_result.length; i++) {
        const tile = box.childNodes[i];
        const val = presenter.matrix_result[i];
        tile.textContent = val.toString();

        if (val) {
            tile.className = 'cell disabled';
        } else {
            tile.className = 'cell hole';
        }
        if (presenter.getActivePosition() === i) {
            tile.classList.add('active');
        }
        if (presenter.comp_moves[i]) {
            tile.classList.add('comp');
        }
        if (presenter.player_moves[i]) {
            tile.classList.add('player');
        }
        if (presenter.isLastMove(i)) {
            tile.classList.add('last');
        }
    }

    const digits_local = presenter.getDigits();
    for (let i = 0; i < presenter.matrix_result.length; i++) {
        const tile = digits.childNodes[i];
        const used = digits_local[i];
        const val = i + 1;
        tile.textContent = val.toString();
        tile.className = 'digit';

        if (used) {
            tile.classList.add('disabled');
        }
        if (presenter.getActiveDigitIndex() === i) {
            tile.classList.add('active');
        }
        // if (i === presenter.matrix_result[presenter.getLastCompMove()] - 1) {
        //     tile.classList.add('comp');
        // }
        // if (i === presenter.matrix_result[presenter.getLastUserMove()] - 1) {
        //     tile.classList.add('player');
        // }
    }
}

export default function game(window, document, settings) {
    const box = document.getElementsByClassName("box")[0];
    const digits = document.getElementsByClassName("digits")[0];
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];
    const btnInstall = document.getElementsByClassName("install")[0];

    const startRed = settings.startRed;

    const solver = solverFunc(3);
    const presenter = presenterFunc(solver, settings);
    const aiBot = ai(solver, presenter, afterMove);

    function onGameEnd() {
        const message = presenter.isWin(startRed) ? "You win" : "You lose";
        const h2 = overlay.querySelectorAll('h2')[0];
        h2.textContent = message;
        const content = overlay.querySelectorAll('.content')[0];
        content.textContent = "Determinant =  " + presenter.getResult();
        overlay.classList.add('show');
        btnInstall.classList.remove('hidden2');
    }

    function afterMove() {
        drawWithAnimation();
        if (presenter.lessThanTwoMoves()) {
            onGameEnd();
        }
    }

    function doStep() {
        const res = presenter.tryMove();
        afterMove();
        if (res) {
            aiBot.makeMove();
        }
    }

    const handleBox = function (evt) {
        presenter.setActivePosition(handleClick(evt, box));
        doStep();
    };

    const handleClickDigits = function (evt) {
        presenter.setActiveDigitIndex(handleClick(evt, digits));
        doStep();
    };

    function drawWithAnimation() {
        draw(presenter, box, digits);
    }

    function initField(fieldSize, className, elem) {
        for (let i = 0; i < fieldSize; i++) {
            const cell = document.createElement('div');
            cell.className = className;
            elem.appendChild(cell);
        }
    }

    initField(presenter.matrix_result.length, 'cell', box);
    initField(presenter.matrix_result.length, 'digit', digits);

    box.addEventListener("click", handleBox, false);
    digits.addEventListener("click", handleClickDigits, false);
    close.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);

    drawWithAnimation();
    if (startRed) {
        aiBot.makeMove();
    }
    return {
        guess: () => aiBot.makeMove()
    }
}
