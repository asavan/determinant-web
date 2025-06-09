import test from "node:test";
import assert from "node:assert/strict";

import solverFunc from "../../src/solver.js";

test("fill digits", () => {
    const solver = solverFunc(3);
    const matrix = [1, 2, 3, 0, 5, 6, 7, 8, 9];
    const step = solver.fill_digits(matrix, []);
    assert.deepStrictEqual(matrix, [1, 2, 3, 0, 5, 6, 7, 8, 9], "not changed");
    assert.equal(step, 8, "wrong step");
});

test("fill matrix", () => {
    const solver = solverFunc(3);
    const matrix = [1, 2, 3, 0, 5, 6, 7, 8, 9];
    const step = solver.fill_matrix(matrix);
    assert.deepStrictEqual(matrix, [1, 2, 3, 4, 5, 6, 7, 8, 9], "matrix filled bad");
    assert.equal(step, 9, "wrong step");
});

test("determinant 8 step", () => {
    const solver = solverFunc(3);
    const matrix = [7, 6, 1, 5, 4, 8, 2, 0, 3];
    const result = solver.getResultFromMatrix(matrix);
    assert.equal(result, -377, "wrong step");
});

test("determinant 9 step", () => {
    const solver = solverFunc(3);
    const matrix = [7, 6, 1, 5, 4, 8, 2, 9, 3];
    const result = solver.getResultFromMatrix(matrix);
    assert.equal(result, -377, "wrong step");
});
