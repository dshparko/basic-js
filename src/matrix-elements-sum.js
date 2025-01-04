const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
  let sum = 0;
  for (let i = 0; i < matrix[0].length; i++) {
    sum += matrix[0][i];
  }
  for (let j = 1; j < matrix.length; j++) {
    for (let k = 0; k < matrix[0].length; k++) {
      if (matrix[j - 1][k] !== 0) {
        sum += matrix[j][k];
      }
    }
  }
  return sum;
}

module.exports = {
  getMatrixElementsSum,
};
