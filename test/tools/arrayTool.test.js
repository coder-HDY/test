const {
  arrayIntersection,
  arrayUnion,
  arrayDifference
} = require('../../tools/arrayTool');

describe('配列ツールのテスト', () => {
  describe('arrayIntersection()', () => {
    it('2つの配列の共通要素を返すこと', () => {
      // Arrange
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5, 6];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([3, 4]);
    });

    it('重複を含む入力でも共通要素を一意に返すこと', () => {
      // Arrange
      const arr1 = [1, 2, 2, 3];
      const arr2 = [2, 2, 4];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([2]);
    });

    it('空配列を含む場合は空配列を返すこと', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [1, 2, 3];

      // Act
      const result = arrayIntersection(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('配列以外の引数が渡された場合はエラーを投げること', () => {
      // Arrange
      const invalidArg = 'not-array';

      // Act & Assert
      expect(() => arrayIntersection(invalidArg, [1, 2])).toThrow('Both arguments must be arrays');
      expect(() => arrayIntersection([1, 2], null)).toThrow('Both arguments must be arrays');
    });
  });

  describe('arrayUnion()', () => {
    it('2つの配列の和集合を返すこと', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [3, 4, 5];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('両方が空配列の場合は空配列を返すこと', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('文字列要素でも和集合を正しく返すこと', () => {
      // Arrange
      const arr1 = ['a', 'b'];
      const arr2 = ['b', 'c'];

      // Act
      const result = arrayUnion(arr1, arr2);

      // Assert
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('配列以外の引数が渡された場合はエラーを投げること', () => {
      // Arrange
      const invalidArg = 123;

      // Act & Assert
      expect(() => arrayUnion(invalidArg, [1, 2])).toThrow('Both arguments must be arrays');
      expect(() => arrayUnion([1, 2], {})).toThrow('Both arguments must be arrays');
    });
  });

  describe('arrayDifference()', () => {
    it('第一配列にのみ存在する要素を返すこと', () => {
      // Arrange
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2]);
    });

    it('第二配列が空配列の場合は第一配列を返すこと', () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([1, 2, 3]);
    });

    it('第一配列が空配列の場合は空配列を返すこと', () => {
      // Arrange
      const arr1 = [];
      const arr2 = [1, 2, 3];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([]);
    });

    it('重複要素を含む場合でも差集合を正しく返すこと', () => {
      // Arrange
      const arr1 = [1, 1, 2, 3];
      const arr2 = [1];

      // Act
      const result = arrayDifference(arr1, arr2);

      // Assert
      expect(result).toEqual([2, 3]);
    });

    it('配列以外の引数が渡された場合はエラーを投げること', () => {
      // Arrange
      const invalidArg = undefined;

      // Act & Assert
      expect(() => arrayDifference(invalidArg, [1, 2])).toThrow('Both arguments must be arrays');
      expect(() => arrayDifference([1, 2], false)).toThrow('Both arguments must be arrays');
    });
  });
});