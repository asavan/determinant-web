"use strict"; // jshint ;_;
import solverFunc from "./solver.js";
import presenterFunc from "./presenter.js";
import draw from "./views/draw.js";
import initerFunc from "./views/initer.js";
import enderFunc from "./views/ender.js";
import handleClick from "./views/click.js";

function stub() {
}

export default function game(window, document, settings) {
    const box = document.querySelector(".box");
    const digits = document.querySelector(".digits");

    if (settings.size !== 3) {
        const root = document.documentElement;
        root.style.setProperty("--field-size", settings.size);
    }

    if (settings.modeGuessCount === 2) {
        const root = document.documentElement;
        root.style.setProperty("--digit-color", "darkblue");
    }

    const solver = solverFunc(settings.size);
    const presenter = presenterFunc(solver, settings);
    const initHelper = initerFunc(document, solver.getSizeSqr());
    const endHelper = enderFunc(document, presenter);


    const handlers = {
        "playerMove": stub,
        "enemyMove": stub,
        "meMove": stub,
        "aiMove": stub,
        "aiHint": stub,
        "gameover": stub
    };

    function onGameEnd() {
        endHelper.onGameEnd();
        handlers["gameover"]();
    }

    async function afterMove(res, isCurrentRed) {
        await drawWithAnimation();
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
        }
    }

    function doStep() {
        const res = presenter.tryMove();
        return afterMove(res, presenter.isCurrentRed());
    }

    const handleBox = function (evt) {
        presenter.setActivePosition(handleClick(evt));
        return doStep();
    };

    const handleClickDigits = function (evt) {
        presenter.setActiveDigitIndex(handleClick(evt));
        return doStep();
    };

    function drawWithAnimation() {
        return draw(presenter, box, digits);
    }

    initHelper.initField(["cell", "hole"], box, false);
    initHelper.initField( ["digit"], digits, true);

    const firstCell = document.querySelector(".cell");
    firstCell?.addEventListener("dblclick", help);

    box.addEventListener("click", handleBox, false);
    digits.addEventListener("click", handleClickDigits, false);

    function on(name, f) {
        handlers[name] = f;
    }

    function wrap(name, f) {
        const oldf = handlers[name];
        handlers[name] = (arg) => {
            oldf(arg);
            f(arg);
        };
    }

    function aiMove(res) {
        const isSucc = presenter.onAiMove(res);
        return afterMove(isSucc, presenter.isCurrentRed());
    }

    function aiHint(res) {
        presenter.onAiHint(res);
        drawWithAnimation();
    }

    function getSolver() {
        return solver;
    }

    function allCallbacksInited() {
        return afterMove(true, presenter.isCurrentRed());
    }

    function help() {
        handlers["aiHint"](presenter.matrix_result);
    }

    return {
        guess: help,
        allCallbacksInited,
        on: on,
        wrap: wrap,
        aiMove: aiMove,
        aiHint: aiHint,
        getSolver: getSolver,
    };
}
