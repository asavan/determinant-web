const solverFunc = function (size) {
    const size_sqr = size * size;
    const INF = 500;
    const MINUS_INF = -500;
    let bestK = -1;
    let bestPos = -1;

    const determinant3 = a => {
        return a[0] * a[4] * a[8] +
            a[6] * a[1] * a[5] +
            a[3] * a[7] * a[2]
            - a[2] * a[4] * a[6]
            - a[1] * a[3] * a[8]
            - a[0] * a[5] * a[7];
    };

    const is_first = step => step % 2 === 0;

    const copy_matrix = (src, dst) => {
        for (let i = 0; i < size_sqr; ++i) {
            dst[i] = src[i];
        }
    };

    const who_wins = function (matrix, digits, step, best1, best2) {

        if (step === size_sqr) {
            return determinant3(matrix);
        }

        let digits_count = 0;
        for (let k = 0; k < size_sqr; ++k) {
            if (digits[k]) {
                continue;
            }

            ++digits_count;
            // TODO check this
            if (digits_count === 2 && step === size_sqr - 2) {
                break;
            }

            digits[k] = true;
            for (let i = 0; i < size_sqr; ++i) {
                if (matrix[i] !== 0) {
                    continue;
                }
                matrix[i] = k + 1;
                const res = who_wins(matrix, digits, step + 1, best1, best2);


                if (is_first(step)) {
                    if (best2 < res) {
                        best2 = res;
                    }
                } else {
                    if (best1 > res) {
                        best1 = res;
                    }
                }

                matrix[i] = 0;

                if ((!is_first(step) && res <= best2) || (is_first(step) && res >= best1)) {
                    digits[k] = false;
                    return res;
                }

            }
            digits[k] = false;
        }
        return is_first(step) ? best2 : best1;
    };

    function fill_digits(matrix, digits) {
        let step = 0;
        for (let i = 0; i < size_sqr; ++i) {
            const value = matrix[i];
            if (value > 0) {
                ++step;
                let index = value - 1;
                digits[index] = true;
            }
        }
        return step;
    }

    const solve_matrix_flat = function (matrix_) {

        const matrix = [];
        copy_matrix(matrix_, matrix);

        const digits = [];
        let step = fill_digits(matrix, digits);
        let best1 = INF;
        let best2 = MINUS_INF;
        const isFirstStep = is_first(step);
        if (step === size_sqr) {
            best1 = who_wins(matrix, digits, step, best1, best2);
            bestK = -1;
            bestPos = -1;
        }

        if (step === 0) {
            best2 = 40;
            bestK = 4;
            bestPos = randomInteger(0, size_sqr);
            return {result: best2, bestK: bestK, bestPos: bestPos};
        }


        for (let k = 0; k < size_sqr; ++k) {
            if (digits[k]) {
                continue;
            }
            digits[k] = true;
            const end = step === 1 ? 6 : size_sqr;
            for (let i = 0; i < end; ++i) {
                if (matrix[i] !== 0) {
                    continue;
                }
                let save_result = false;
                matrix[i] = k + 1;
                const res = who_wins(matrix, digits, step + 1, best1, best2);


                if (isFirstStep) {
                    if (best2 < res) {
                        best2 = res;
                        save_result = true;
                    }
                } else {
                    if (best1 > res) {
                        best1 = res;
                        save_result = true;
                    }
                }

                if (save_result) {
                    // copy_matrix(matrix, matrix_);
                    bestPos = i;
                    bestK = k;
                }

                matrix[i] = 0;
            }
            digits[k] = false;
        }
        const result = isFirstStep ? best2 : best1;
        return {result: result, bestK: bestK, bestPos: bestPos};
    };

    const matrix_to_int = function (matrix) {
        let val = 0;
        for (let i = 0; i < size_sqr; ++i) {
            val *= 10;
            val += matrix[i];
        }
        return val;
    }

    const int_to_result = function (val) {
        const sign = val < 0 ? -1 : 1;
        val *= sign;
        const bestPos = val % 10;
        val -= bestPos;
        val /= 10;
        const bestK = val % 10;
        val -= bestK;
        val /= 10;
        const result = sign * val;
        return {result: result, bestK: bestK, bestPos: bestPos};
    }

    return {
        solve_matrix_flat: solve_matrix_flat,
        fill_digits: fill_digits,
        isFirstStep: is_first,
        matrix_to_int: matrix_to_int,
        int_to_result: int_to_result,
        determinant: determinant3
    }
};

export {solverFunc}
