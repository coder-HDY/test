const { arrayIntersection, arrayUnion, arrayDifference } = require('../../tools/arrayTool');

describe('Array Tools Test Suite', () => {
  // ========== arrayIntersection 测试 ==========
  describe('arrayIntersection()', () => {
    it('应该返回两个数组的交集', () => {
      // Arrange
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5, 6];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([3, 4]);
    });

    it('应该在无交集时返回空数组', () => {
      // Arrange
      const arr1 = [1, 2];
      const arr2 = [3, 4];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('应该在空数组输入时返回空数组', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [1, 2, 3];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('当参数不是数组时应该抛出错误', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const invalidArg = 'not-an-array';

      // Act & Assert
      expect(() => arrayIntersection(arr1, invalidArg)).toThrow('Both arguments must be arrays');
      expect(() => arrayIntersection(null, arr1)).toThrow('Both arguments must be arrays');
    });
  });

  // ========== arrayUnion 测试 ==========
  describe('arrayUnion()', () => {
    it('应该返回两个数组的并集且元素不重复', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [3, 4, 5];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('应该在两个空数组输入时返回空数组', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('应该正确处理重复元素', () => {
      // Arrange
      const arr1 = [1, 1, 2, 2];
      const arr2 = [2, 3, 3];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3]);
    });

    it('当参数不是数组时应该抛出错误', () => {
      // Arrange
      const arr1 = [1, 2, 3];

      // Act & Assert
      expect(() => arrayUnion(arr1, undefined)).toThrow('Both arguments must be arrays');
      expect(() => arrayUnion({}, arr1)).toThrow('Both arguments must be arrays');
    });
  });

  // ========== arrayDifference 测试 ==========
  describe('arrayDifference()', () => {
    it('应该返回存在于 arr1 但不存在于 arr2 的元素', () => {
      // Arrange
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2]);
    });

    it('应该在 arr2 为空时返回 arr1 中未被移除的元素（保留重复）', () => {
      // Arrange
      const arr1 = [1, 2, 2, 3];
      const arr2 = [];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 2, 3]);
    });

    it('应该在 arr1 为空时返回空数组', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [1, 2, 3];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('当参数不是数组时应该抛出错误', () => {
      // Arrange
      const arr2 = [1, 2, 3];

      // Act & Assert
      expect(() => arrayDifference('invalid', arr2)).toThrow('Both arguments must be arrays');
      expect(() => arrayDifference(arr2, 123)).toThrow('Both arguments must be arrays');
    });
  });
});
