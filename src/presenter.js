"use strict";

export default function presenterFunc(solver, settings) {
    const startRed = settings.color === "red";
    let currentUserIsRed = startRed;
    let activeCellIndex = -1;
    let activeDigitIndex = -1;
    let lastCompMove = -1;
    let lastUserMove = -1;

    let bestDigit = -1;
    let bestPos = -1;
    let currGuess = 0;
    let step = 0;
    const matrix_result = solver.emptyMatrix();
    const player_moves = solver.emptyBoolArray();
    const comp_moves = solver.emptyBoolArray();
    const digits = solver.emptyBoolArray();

    function onAiMove(res) {
        currGuess = res.result;
        return autoMove(res.bestPos, res.bestK);
    }

    function onAiHint(res) {
        currGuess = res.result;
        bestPos = res.bestPos;
        bestDigit = res.bestK;
    }

    const getResult = () => {
        const res = solver.getResultFromMatrix(matrix_result);
        currGuess = res;
        return res;
    };

    const getLastCompMove = () => lastCompMove;

    const getLastUserMove = () => lastUserMove;

    const isLastMove = (m) => lastCompMove === m || lastUserMove === m;

    const isBestDigit = (m) => bestDigit === m;
    const isBestPosition = (m) => bestPos === m;

    const setMove = function(position, digit, isRed) {
        if (position < 0) {
            return false;
        }

        if (digit < 0) {
            return false;
        }

        if (position >= matrix_result.length) {
            console.error("Bad position", position, digit, isRed);
            return false;
        }

        if (matrix_result[position] !== 0) {
            console.log("State error");
            return false;
        }
        matrix_result[position] = digit + 1;
        if (!isRed) {
            player_moves[position] = true;
            lastUserMove = position;
            lastCompMove = -1;
        } else {
            comp_moves[position] = true;
            lastCompMove = position;
            lastUserMove = -1;
        }

        step = solver.fill_digits(matrix_result, digits);

        activeCellIndex = -1;
        activeDigitIndex = -1;
        bestPos = -1;
        bestDigit = -1;
        return true;
    };

    const autoMove = (position, digit) => {
        const res = setMove(position, digit, currentUserIsRed);
        if (res) {
            currentUserIsRed = !currentUserIsRed;
        }
        return res;
    };

    const tryMove = () => autoMove(getActivePosition(), getActiveDigitIndex());

    const setActiveDigitIndex = function (ind) {
        if (currentUserIsRed && settings.mode !== "hotseat") {
            return;
        }
        if (ind >= 0) {
            if (ind >= digits.length || digits[ind]) {
                activeDigitIndex = -1;
                return;
            }
        }
        activeDigitIndex = ind;
    };

    const getActiveDigitIndex = () => activeDigitIndex;

    const setActivePosition = function (pos) {
        if (currentUserIsRed && settings.mode !== "hotseat") {
            return;
        }
        if (pos >= 0) {
            if (pos >= matrix_result.length || matrix_result[pos] > 0) {
                activeCellIndex = -1;
                return;
            }
        }
        activeCellIndex = pos;
    };


    function whoStarts() {
        if (settings.mode !== "hotseat") {
            return startRed;
        }
        const remainingSteps = matrix_result.length - step;
        return remainingSteps % 2 === 0;
    }

    const getActivePosition = () => activeCellIndex;

    const getDigits = () => digits;

    const getStep = () => step;

    const isWin = (startRed) => getResult() > 0 !== startRed;

    const endMessage = () => {
        console.log(currGuess);
        return isWin(whoStarts()) ? "You win" : "You lose";
    };

    const isCurrentRed = () => currentUserIsRed;

    const lessThanTwoMoves = () => step + 2 > matrix_result.length;

    return {
        matrix_result: matrix_result,
        player_moves: player_moves,
        comp_moves: comp_moves,
        getLastCompMove: getLastCompMove,
        getLastUserMove: getLastUserMove,
        isLastMove: isLastMove,
        getResult: getResult,
        getActiveDigitIndex: getActiveDigitIndex,
        setActiveDigitIndex: setActiveDigitIndex,
        getActivePosition: getActivePosition,
        setActivePosition,
        onAiMove,
        onAiHint: onAiHint,
        getDigits: getDigits,
        getStep: getStep,
        endMessage: endMessage,
        lessThanTwoMoves: lessThanTwoMoves,
        tryMove,
        isCurrentRed: isCurrentRed,
        isBestDigit: isBestDigit,
        isBestPosition: isBestPosition
    };
}
