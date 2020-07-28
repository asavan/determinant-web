"use strict"; // jshint ;_;
import {solver} from "./solver.js";
const size = 3;
const size_sqr = size * size;

export default function game(window, document, startRed, myWorker) {

    //Constants
    const animationTime = 100;

    const presenter = function (solver_) {
        let activeCellIndex = -1;
        let activeDigitIndex = -1;
        let lastCompMove = -1;
        let lastUserMove = -1;

        let bestDigit = -1;
        let bestPos = -1;
        let currResult = 0;
        let step = -1;
        const matrix_result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        const player_moves = [false, false, false, false, false, false, false, false, false];
        const comp_moves = [false, false, false, false, false, false, false, false, false];

        let lastMoveTime = null;

        function onAiMove(res) {
            // console.timeEnd("stepTime");
            // console.log(res.result);
            currResult = res.result;
            bestPos = res.bestPos;
            bestDigit = res.bestK;
            if (bestPos >= 0) {
                if (matrix_result[bestPos] === 0) {
                    matrix_result[bestPos] = bestDigit + 1;
                    comp_moves[bestPos] = true;
                    lastCompMove = bestPos;
                }
            }

            activeCellIndex = -1;
            activeDigitIndex = -1;
        }

        function onAiMoveWithAnimation(res) {
            onAiMove(res);
            const currTime = new Date();
            const minMoveTime = 7 * animationTime;
            if (lastMoveTime && currTime - lastMoveTime < minMoveTime) {
                // console.log(currTime - lastMoveTime);
                setTimeout(afterMove, minMoveTime - (currTime - lastMoveTime));
            } else {
                console.log("Why Instant?");
                afterMove();
            }
        }

        function onWorkerMove(val) {
            // console.log(val);
            const res = solver_.int_to_result(val);
            // console.log(res);
            onAiMoveWithAnimation(res);
        }

        const makeMove = function () {
            // console.time("stepTime");
            const digits = [];
            let step = solver_.fill_digits(matrix_result, digits);
            lastMoveTime = new Date();
            if (step === size_sqr) {
                let best1 = solver_.determinant(matrix_result);
                onAiMoveWithAnimation({result: best1, bestK: -1, bestPos: -1});
                return lastMoveTime;
            }

            if (step === 0) {
                let bestPos = solver_.randomInteger(0, size_sqr);
                onAiMoveWithAnimation({result: 40, bestK: 4, bestPos: bestPos});
                return lastMoveTime;
            }

            const matrixVal = solver_.matrix_to_int(matrix_result);
            myWorker.postMessage(matrixVal);
            return lastMoveTime;
        };
        const getResult = () => currResult;
        const getLastCompMove = () => lastCompMove;

        const getLastUserMove = () => lastUserMove;
        const isUserDigit = (d) => matrix_result[lastUserMove] - 1;

        const setUserMove = function (position, digit) {
            if (matrix_result[position] !== 0) {
                console.log("State error");
                return;
            }
            matrix_result[position] = digit + 1;
            player_moves[position] = true;
            lastUserMove = position;
            activeCellIndex = -1;
            activeDigitIndex = -1;
        };

        const setActiveDigitIndex = function (ind) {
            step = -1;
            if (ind >= 0) {
                const digits_local = [];
                step = solver_.fill_digits(presenter.matrix_result, digits_local);
                if (digits_local[ind]) {
                    activeDigitIndex = -1;
                    return;
                }
            }
            activeDigitIndex = ind;
        };

        const getActiveDigitIndex = () => activeDigitIndex;

        const setActivePosition = function (pos) {
            if (pos >= 0) {
                if (matrix_result[pos] > 0) {
                    activeCellIndex = -1;
                    return;
                }
            }
            activeCellIndex = pos;
        };

        const getActivePosition = () => activeCellIndex;

        const getStep = () => step;


        return {
            matrix_result: matrix_result,
            player_moves: player_moves,
            comp_moves: comp_moves,
            getLastCompMove: getLastCompMove,
            getLastUserMove: getLastUserMove,
            makeMove: makeMove,
            getResult: getResult,
            setUserMove: setUserMove,
            getActiveDigitIndex: getActiveDigitIndex,
            setActiveDigitIndex: setActiveDigitIndex,
            getActivePosition: getActivePosition,
            setActivePosition: setActivePosition,
            getStep: getStep,
            onAiMove: onAiMove,
            onWorkerMove: onWorkerMove
        }
    }(solver);

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

    function onGameEnd() {
        const message = ((presenter.getResult() > 0) && solver.isFirstStep(presenter.getStep())) ? "You win" : "You lose";
        const h2 = overlay.querySelectorAll('h2')[0];
        h2.textContent = message;
        const content = overlay.querySelectorAll('.content')[0];
        content.textContent = "Result " + presenter.getResult();
        overlay.classList.add('show');
        btnInstall.classList.remove('hidden2');
    }

    function afterMove() {
        drawWithAnimation();
        if (presenter.getStep() > 5) {
            onGameEnd();
        }
    }

    function doStep() {
        if (presenter.getActivePosition() >= 0 && presenter.getActiveDigitIndex() >= 0) {
            presenter.setUserMove(presenter.getActivePosition(), presenter.getActiveDigitIndex());
            // drawWithAnimation();
            presenter.makeMove();
            // // log(step);
            // setTimeout(function () {
            //     presenter.makeMove();
            //     afterMove();
            // }, 5 * animationTime);
        }
        drawWithAnimation();
    }

    const handleBox = function (evt) {
        presenter.setActivePosition(handleClick(evt, box));
        doStep();
    };

    const handleClickDigits = function (evt) {
        presenter.setActiveDigitIndex(handleClick(evt, digits));
        doStep();
    };

    const handleWorkerMessage = function (e) {
        presenter.onWorkerMove(e.data);
    };

    function drawWithAnimation() {
        draw();
    }

    const box = document.getElementsByClassName("box")[0];
    const digits = document.getElementsByClassName("digits")[0];
    const overlay = document.getElementsByClassName("overlay")[0];
    const close = document.getElementsByClassName("close")[0];
    const btnInstall = document.getElementsByClassName("install")[0];

    for (let i = 0; i < size_sqr; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        box.appendChild(cell);
    }

    for (let i = 0; i < size_sqr; i++) {
        const cell = document.createElement('div');
        cell.className = 'digit';
        digits.appendChild(cell);
    }

    function draw() {
        const digits_local = [];
        for (let i = 0; i < size_sqr; i++) {
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
            if (i === presenter.getLastUserMove() || i === presenter.getLastCompMove()) {
                tile.classList.add('last');
            }
        }

        solver.fill_digits(presenter.matrix_result, digits_local);

        for (let i = 0; i < size_sqr; i++) {
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
            if (i === presenter.matrix_result[presenter.getLastCompMove()] - 1) {
                tile.classList.add('comp');
            }
            if (i === presenter.matrix_result[presenter.getLastUserMove()] - 1) {
                tile.classList.add('player');
            }
        }
    }

    box.addEventListener("click", handleBox, false);
    digits.addEventListener("click", handleClickDigits, false);
    close.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.remove("show");
    }, false);
    myWorker.addEventListener('message', handleWorkerMessage, false);
    drawWithAnimation();
    if (startRed) {
        presenter.makeMove();
    }
    return {
        guess: () => presenter.makeMove()
    }
}

