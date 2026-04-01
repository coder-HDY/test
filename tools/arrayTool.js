const _ = require('lodash');

/**
 * 验证参数是否都是数组
 */
function validateArrays(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Both arguments must be arrays');
  }
}

/**
 * 返回两个数组的交集（两个数组中都存在的元素）
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 交集数组
 */
function arrayIntersection(arr1, arr2) {
  validateArrays(arr1, arr2);
  return _.intersection(arr1, arr2);
}

/**
 * 返回两个数组的并集（两个数组中所有不重复的元素）
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 并集数组
 */
function arrayUnion(arr1, arr2) {
  validateArrays(arr1, arr2);
  return _.union(arr1, arr2);
}

/**
 * 返回两个数组的差集（存在于 arr1 但不存在于 arr2 的元素）
 * @param {Array} arr1 - 基准数组
 * @param {Array} arr2 - 排除数组
 * @returns {Array} 差集数组
 */
function arrayDifference(arr1, arr2) {
  validateArrays(arr1, arr2);
  return _.difference(arr1, arr2);
}

module.exports = { arrayIntersection, arrayUnion, arrayDifference };
