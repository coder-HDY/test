const {
  validateEmail,
  validateUsername,
  validatePassword,
  isEqualValue
} = require('../../tools/validationTool');

describe('Validation Tools Test Suite', () => {

  // ========== validateEmail 测试 ==========
  describe('validateEmail()', () => {
    it('应该验证正确的邮箱格式', () => {
      // Arrange
      const email = 'user@example.com';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证带点的邮箱', () => {
      // Arrange
      const email = 'user.name@example.co.uk';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证带加号的邮箱', () => {
      // Arrange
      const email = 'user+tag@example.com';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证带下划线的邮箱', () => {
      // Arrange
      const email = 'user_name@example.com';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(true);
    });

    it('应该拒绝缺少@符号的邮箱', () => {
      // Arrange
      const email = 'userexample.com';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝缺少域名的邮箱', () => {
      // Arrange
      const email = 'user@';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝缺少用户名部分的邮箱', () => {
      // Arrange
      const email = '@example.com';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝缺少顶级域名的邮箱', () => {
      // Arrange
      const email = 'user@example';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝包含空格的邮箱', () => {
      // Arrange
      const email = 'user @example.com';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝空字符串', () => {
      // Arrange
      const email = '';

      // Act
      const result = validateEmail(email);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝 null 值', () => {
      // Arrange
      const email = null;

      // Act & Assert
      expect(() => validateEmail(email)).toThrow('Email must be a string');
    });

    it('应该拒绝非字符串类型', () => {
      // Arrange
      const email = 123;

      // Act & Assert
      expect(() => validateEmail(email)).toThrow('Email must be a string');
    });
  });

  // ========== validateUsername 测试 ==========
  describe('validateUsername()', () => {
    it('应该验证正确的用户名（字母+数字+下划线）', () => {
      // Arrange
      const username = 'user_123';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证最小长度 3 字符的用户名', () => {
      // Arrange
      const username = 'abc';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证最大长度 20 字符的用户名', () => {
      // Arrange
      const username = 'user_12345678901234';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证纯字母的用户名', () => {
      // Arrange
      const username = 'username';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证纯数字的用户名', () => {
      // Arrange
      const username = '12345';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(true);
    });

    it('应该拒绝长度小于 3 字符的用户名', () => {
      // Arrange
      const username = 'ab';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝长度大于 20 字符的用户名', () => {
      // Arrange
      const username = 'user_1234567890123456';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝包含特殊字符的用户名', () => {
      // Arrange
      const username = 'user@name';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝包含空格的用户名', () => {
      // Arrange
      const username = 'user name';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝包含中文字符的用户名', () => {
      // Arrange
      const username = '用户名';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝空字符串', () => {
      // Arrange
      const username = '';

      // Act
      const result = validateUsername(username);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝 null 值', () => {
      // Arrange
      const username = null;

      // Act & Assert
      expect(() => validateUsername(username)).toThrow('Username must be a string');
    });

    it('应该拒绝非字符串类型', () => {
      // Arrange
      const username = 123;

      // Act & Assert
      expect(() => validateUsername(username)).toThrow('Username must be a string');
    });
  });

  // ========== validatePassword 测试 ==========
  describe('validatePassword()', () => {
    it('应该验证符合所有规则的密码', () => {
      // Arrange
      const password = 'MyPassword123!';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证包含多个特殊字符的密码', () => {
      // Arrange
      const password = 'Pass@word#123';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(true);
    });

    it('应该验证正好 8 字符的密码', () => {
      // Arrange
      const password = 'Abcde123!@#';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(true);
    });

    it('应该拒绝长度小于 8 字符的密码', () => {
      // Arrange
      const password = 'Pass1!';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝缺少大写字母的密码', () => {
      // Arrange
      const password = 'password123!';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝缺少小写字母的密码', () => {
      // Arrange
      const password = 'PASSWORD123!';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝缺少数字的密码', () => {
      // Arrange
      const password = 'PasswordAbcd!';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝缺少特殊字符的密码', () => {
      // Arrange
      const password = 'PasswordAbcd123';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝空字符串', () => {
      // Arrange
      const password = '';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(false);
    });

    it('应该拒绝 null 值', () => {
      // Arrange
      const password = null;

      // Act & Assert
      expect(() => validatePassword(password)).toThrow('Password must be a string');
    });

    it('应该拒绝非字符串类型', () => {
      // Arrange
      const password = 123;

      // Act & Assert
      expect(() => validatePassword(password)).toThrow('Password must be a string');
    });

    it('应该拒绝仅包含空格的密码', () => {
      // Arrange
      const password = '        ';

      // Act
      const result = validatePassword(password);

      // Assert
      expect(result).toBe(false);
    });
  });

  // ========== isEqualValue 测试 ==========
  describe('isEqualValue()', () => {
    it('应该判断两个相同数字相等', () => {
      // Arrange
      const value1 = 100;
      const value2 = 100;

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(true);
    });

    it('应该判断两个不同数字不相等', () => {
      // Arrange
      const value1 = 100;
      const value2 = 101;

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(false);
    });

    it('应该深度比较对象并返回相等', () => {
      // Arrange
      const value1 = {
        id: 1,
        profile: {
          name: 'Alice',
          tags: ['admin', 'user']
        }
      };
      const value2 = {
        id: 1,
        profile: {
          name: 'Alice',
          tags: ['admin', 'user']
        }
      };

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(true);
    });

    it('应该深度比较对象并返回不相等', () => {
      // Arrange
      const value1 = {
        id: 1,
        profile: {
          name: 'Alice',
          tags: ['admin', 'user']
        }
      };
      const value2 = {
        id: 1,
        profile: {
          name: 'Alice',
          tags: ['admin', 'guest']
        }
      };

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(false);
    });

    it('应该按顺序比较数组，不同顺序返回不相等', () => {
      // Arrange
      const value1 = [1, 2, 3];
      const value2 = [3, 2, 1];

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(false);
    });

    it('应该比较 Date 对象的时间值', () => {
      // Arrange
      const value1 = new Date('2026-01-01T00:00:00.000Z');
      const value2 = new Date('2026-01-01T00:00:00.000Z');

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(true);
    });

    it('应该比较 null 和 undefined 的边界值', () => {
      // Arrange
      const value1 = null;
      const value2 = undefined;

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(false);
    });

    it('应该比较 NaN 并返回相等', () => {
      // Arrange
      const value1 = NaN;
      const value2 = NaN;

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(true);
    });

    it('应该比较不同类型值并返回不相等', () => {
      // Arrange
      const value1 = '123';
      const value2 = 123;

      // Act
      const result = isEqualValue(value1, value2);

      // Assert
      expect(result).toBe(false);
    });
  });
});
