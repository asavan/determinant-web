"use strict";

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

function ai(solver_, presenter_, myWorker, afterMove) {
    let lastMoveTime = null;

    function onAiMoveWithAnimation(res) {
        presenter_.onAiMove(res);
        const currTime = new Date();
        const minMoveTime = 700;
        if (lastMoveTime && currTime - lastMoveTime < minMoveTime) {
            // console.log(currTime - lastMoveTime);
            setTimeout(afterMove, minMoveTime - (currTime - lastMoveTime));
        } else {
            console.log("Why Instant?");
            afterMove();
        }
    }

    const makeMove = function () {
        // console.time("stepTime");
        const digits = [];
        let step = solver_.fill_digits(presenter_.matrix_result, digits);
        lastMoveTime = new Date();
        if (step === presenter_.matrix_result.length) {
            let best1 = solver_.determinant(presenter_.matrix_result);
            onAiMoveWithAnimation({result: best1, bestK: -1, bestPos: -1});
            return lastMoveTime;
        }

        if (step === 0) {
            let bestPos = randomInteger(0, presenter_.matrix_result.length);
            onAiMoveWithAnimation({result: 40, bestK: 4, bestPos: bestPos});
            return lastMoveTime;
        }

        const matrixVal = solver_.matrix_to_int(presenter_.matrix_result);
        myWorker.postMessage(matrixVal);
        return lastMoveTime;
    };

    return {
        makeMove: makeMove,
        onAiMoveWithAnimation: onAiMoveWithAnimation
    }

}
export {ai}
