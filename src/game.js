"use strict"; // jshint ;_;
import solverFunc from "./solver.js";
import presenterFunc from "./presenter.js";

function stub() {
}

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
            if (presenter.isCurrentRed()) {
                tile.classList.add('comp');
            } else {
                tile.classList.add('player');
            }
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
        if (presenter.isBestPosition(i)) {
            tile.classList.add('best');
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
            if (presenter.isCurrentRed()) {
                tile.classList.add('comp');
            } else {
                tile.classList.add('player');
            }
        }
        if (i === presenter.matrix_result[presenter.getLastCompMove()] - 1) {
            tile.classList.add('comp');
        }
        if (i === presenter.matrix_result[presenter.getLastUserMove()] - 1) {
            tile.classList.add('player');
        }
        if (presenter.isBestDigit(i)) {
            tile.classList.add('best');
        }
    }
}

export default function game(window, document, settings) {
    const box = document.getElementsByClassName("box")[0];
    const digits = document.getElementsByClassName("digits")[0];
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];
    const btnInstall = document.getElementsByClassName("install")[0];

    if (settings.size !== 3) {
        let root = document.documentElement;
        root.style.setProperty('--field-size', settings.size);
    }

    const startRed = settings.startRed;

    const solver = solverFunc(settings.size);
    const presenter = presenterFunc(solver, settings);


    const handlers = {
        'playerMove': stub,
        'enemyMove': stub,
        'meMove': stub,
        'aiMove': stub,
        'aiHint': stub,
        'gameover': stub
    }

    function onGameEnd() {
        const message = presenter.isWin(startRed) ? "You win" : "You lose";
        const h2 = overlay.querySelector('h2');
        h2.textContent = message;
        const content = overlay.querySelector('.content');
        content.textContent = "Determinant =  " + presenter.getResult();
        overlay.classList.add('show');
        btnInstall.classList.remove('hidden2');
        handlers['gameover'](presenter.isWin(startRed));
    }

    function afterMove(res, isCurrentRed) {
        drawWithAnimation();
        if (res) {
            if (presenter.lessThanTwoMoves()) {
                onGameEnd();
            }
            if (isCurrentRed) {
                if (presenter.getLastUserMove() >= 0) {
                    handlers["playerMove"]({
                        bestPos: presenter.getLastUserMove(),
                        bestK: presenter.matrix_result[presenter.getLastUserMove()] - 1,
                        result: 0
                    });
                }
                handlers["aiMove"](presenter.matrix_result);
            } else {
                if (presenter.getLastCompMove() >= 0) {
                    handlers["enemyMove"]({
                        bestPos: presenter.getLastCompMove(),
                        bestK: presenter.matrix_result[presenter.getLastCompMove()] - 1,
                        result: 0
                    });
                }
                handlers["meMove"](presenter.matrix_result);
            }
            // aiBot.makeMove();
        }
    }

    function doStep() {
        const res = presenter.tryMove();
        afterMove(res, presenter.isCurrentRed());
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

    afterMove(true, presenter.isCurrentRed());

    function on(name, f) {
        handlers[name] = f;
    }

    function aiMove(res) {
        const isSucc = presenter.onAiMove(res);
        afterMove(isSucc, presenter.isCurrentRed());
    }

    function aiHint(res) {
        presenter.onAiHint(res);
        drawWithAnimation();
    }

    function getSolver() {
        return solver;
    }

    return {
        guess: () => handlers["aiHint"](presenter.matrix_result),
        on: on,
        aiMove: aiMove,
        aiHint: aiHint,
        getSolver: getSolver,
    }
}
