"use strict";

export default function presenterFunc(solver, settings) {
    let currentUserIsRed = settings.startRed;
    let activeCellIndex = -1;
    let activeDigitIndex = -1;
    let lastCompMove = -1;
    let lastUserMove = -1;

    let bestDigit = -1;
    let bestPos = -1;
    let currResult = 0;
    let step = 0;
    const matrix_result = Array(solver.getSizeSqr()).fill(0);
    const player_moves = Array(solver.getSizeSqr()).fill(false);
    const comp_moves = Array(solver.getSizeSqr()).fill(false);
    const digits = Array(solver.getSizeSqr()).fill(false);

    function onAiMove(res) {
        currResult = res.result;
        bestPos = res.bestPos;
        bestDigit = res.bestK;
        return autoMove(bestPos, bestDigit);
    }

    const getResult = () => {
        if (currResult) {
            return currResult;
        }
        const matrix = [];
        solver.copy_matrix(matrix_result, matrix);
        solver.fill_matrix(matrix);
        const res = solver.determinant(matrix);
        currResult = res;
        return res;
    };

    const getLastCompMove = () => lastCompMove;

    const getLastUserMove = () => lastUserMove;

    const isLastMove = (m) => lastCompMove === m || lastUserMove === m;

    const setMove = function(position, digit, isRed) {
        if (position < 0) {
            return false;
        }

        if (digit < 0) {
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
        } else {
            comp_moves[position] = true;
            lastCompMove = position;
        }

        step = solver.fill_digits(matrix_result, digits);

        activeCellIndex = -1;
        activeDigitIndex = -1;
        return true;
    }

    const autoMove = function (position, digit) {
        const res = setMove(position, digit, currentUserIsRed);
        if (res) {
            currentUserIsRed = !currentUserIsRed;
        }
        return res;
    }

    const tryMove = function () {
        return autoMove(getActivePosition(), getActiveDigitIndex());
    }

    const setActiveDigitIndex = function (ind) {
        if (currentUserIsRed && settings.currentMode !== "hotseat") {
            return;
        }
        if (ind >= 0) {
            if (digits[ind]) {
                activeDigitIndex = -1;
                return;
            }
        }
        activeDigitIndex = ind;
    };

    const getActiveDigitIndex = () => activeDigitIndex;

    const setActivePosition = function (pos) {
        if (currentUserIsRed && settings.currentMode !== "hotseat") {
            return;
        }
        if (pos >= 0) {
            if (matrix_result[pos] > 0) {
                activeCellIndex = -1;
                return;
            }
        }
        activeCellIndex = pos;
    };

    const getActivePosition = () => activeCellIndex;

    const getDigits = () => digits;

    const getStep = () => step;

    const isWin = (startRed) => {
        return getResult() > 0 !== startRed;
    }

    const isCurrentRed = () => currentUserIsRed;

    const lessThanTwoMoves = () => {
        return step + 2 > matrix_result.length;
    }

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
        setActivePosition: setActivePosition,
        onAiMove: onAiMove,
        getDigits: getDigits,
        getStep: getStep,
        isWin: isWin,
        lessThanTwoMoves: lessThanTwoMoves,
        tryMove: tryMove,
        isCurrentRed: isCurrentRed
    }
};
