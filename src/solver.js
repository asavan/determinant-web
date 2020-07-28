const solverFunc = function (size) {
    const size_sqr = size * size;

    const determinant3 = a => {
        return a[0] * a[4] * a[8] +
            a[6] * a[1] * a[5] +
            a[3] * a[7] * a[2]
            - a[2] * a[4] * a[6]
            - a[1] * a[3] * a[8]
            - a[0] * a[5] * a[7];
    };

    const determinant2 = a => {
        return a[0] * a[3] - a[1]*a[2];
    };

    const determinant = function (a) {
        if (size === 3) {
            return determinant3(a);
        }
        if (size === 2) {
            return determinant2(a);
        }
        // TODO implement
        return size_sqr;
    }

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

    const getSize = () => size;
    const getSizeSqr = () => size_sqr;

    return {
        fill_digits: fill_digits,
        matrix_to_int: matrix_to_int,
        int_to_result: int_to_result,
        determinant: determinant,
        getSize: getSize,
        getSizeSqr: getSizeSqr
    }
};

export {solverFunc}
