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

    it('应该返回字符串数组的交集', () => {
      // Arrange
      const arr1 = ['apple', 'banana', 'cherry'];
      const arr2 = ['banana', 'cherry', 'date'];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual(['banana', 'cherry']);
    });

    it('无交集时应该返回空数组', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('两个空数组的交集应该是空数组', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('其中一个为空数组时应该返回空数组', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('包含重复元素时应该返回不重复的交集', () => {
      // Arrange
      const arr1 = [1, 1, 2, 3];
      const arr2 = [1, 2, 2, 4];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2]);
    });

    it('非数组参数应该抛出错误', () => {
      // Arrange
      const arr1 = 'not an array';
      const arr2 = [1, 2, 3];

      // Act & Assert
      expect(() => arrayIntersection(arr1, arr2)).toThrow('Both arguments must be arrays');
    });

    it('null 参数应该抛出错误', () => {
      // Arrange
      const arr1 = null;
      const arr2 = [1, 2, 3];

      // Act & Assert
      expect(() => arrayIntersection(arr1, arr2)).toThrow('Both arguments must be arrays');
    });
  });

  // ========== arrayUnion 测试 ==========
  describe('arrayUnion()', () => {
    it('应该返回两个数组的并集（不含重复元素）', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [3, 4, 5];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('应该返回字符串数组的并集', () => {
      // Arrange
      const arr1 = ['apple', 'banana'];
      const arr2 = ['banana', 'cherry'];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('两个完全相同的数组并集应该与原数组相同', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3]);
    });

    it('两个空数组的并集应该是空数组', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('其中一个为空数组时应该返回另一个数组', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3]);
    });

    it('包含重复元素的数组并集应该去重', () => {
      // Arrange
      const arr1 = [1, 1, 2];
      const arr2 = [2, 3, 3];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3]);
    });

    it('非数组参数应该抛出错误', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = 123;

      // Act & Assert
      expect(() => arrayUnion(arr1, arr2)).toThrow('Both arguments must be arrays');
    });

    it('undefined 参数应该抛出错误', () => {
      // Arrange
      const arr1 = undefined;
      const arr2 = [1, 2, 3];

      // Act & Assert
      expect(() => arrayUnion(arr1, arr2)).toThrow('Both arguments must be arrays');
    });
  });

  // ========== arrayDifference 测试 ==========
  describe('arrayDifference()', () => {
    it('应该返回 arr1 中存在但 arr2 中不存在的元素', () => {
      // Arrange
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5, 6];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2]);
    });

    it('应该返回字符串数组的差集', () => {
      // Arrange
      const arr1 = ['apple', 'banana', 'cherry'];
      const arr2 = ['banana'];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual(['apple', 'cherry']);
    });

    it('arr2 包含 arr1 所有元素时应该返回空数组', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3, 4, 5];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('arr2 为空时应该返回 arr1 全部元素', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3]);
    });

    it('arr1 为空时应该返回空数组', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [1, 2, 3];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('两个数组无交集时差集应该等于 arr1', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3]);
    });

    it('差集运算应该不影响原数组（不可变）', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3];
      const arr1Copy = [...arr1];

      // Act
      arrayDifference(arr1, arr2);

      // Assert
      expect(arr1).toEqual(arr1Copy);
    });

    it('非数组参数应该抛出错误', () => {
      // Arrange
      const arr1 = { a: 1 };
      const arr2 = [1, 2, 3];

      // Act & Assert
      expect(() => arrayDifference(arr1, arr2)).toThrow('Both arguments must be arrays');
    });
  });
});
