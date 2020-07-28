"use strict";
const presenterFunc = function (solver_) {
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
            step = solver_.fill_digits(matrix_result, digits_local);
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

    const isFirstStep = () => {
        return solver_.isFirstStep(step);
    }

    const getDigits = function() {
        const digits_local = [];
        solver_.fill_digits(matrix_result, digits_local);
        return digits_local;
    }

    const isWin = () => {
        return getResult() > 0 === isFirstStep();
    }

    const lessThanTwoMoves = () => {
        return getStep() + 2 >= matrix_result.length - 1;
    }

    return {
        matrix_result: matrix_result,
        player_moves: player_moves,
        comp_moves: comp_moves,
        getLastCompMove: getLastCompMove,
        getLastUserMove: getLastUserMove,
        getResult: getResult,
        setUserMove: setUserMove,
        getActiveDigitIndex: getActiveDigitIndex,
        setActiveDigitIndex: setActiveDigitIndex,
        getActivePosition: getActivePosition,
        setActivePosition: setActivePosition,
        getStep: getStep,
        onAiMove: onAiMove,
        getDigits: getDigits,
        isWin: isWin,
        lessThanTwoMoves: lessThanTwoMoves
    }
};

export {presenterFunc}
