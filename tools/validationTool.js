const _ = require('lodash');

/**
 * 验证电子邮件格式（RFC 5322 标准）
 * @param {string} email - 待验证的邮箱地址
 * @returns {boolean} 邮箱格式是否有效
 * @throws {Error} 如果 email 不是字符串类型
 */
function validateEmail(email) {
  if (typeof email !== 'string') {
    throw new Error('Email must be a string');
  }

  // RFC 5322 简化正则表达式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length > 0;
}

/**
 * 验证用户名格式
 * 规则：字母、数字、下划线组成，长度 3-20 字符
 * @param {string} username - 待验证的用户名
 * @returns {boolean} 用户名格式是否有效
 * @throws {Error} 如果 username 不是字符串类型
 */
function validateUsername(username) {
  if (typeof username !== 'string') {
    throw new Error('Username must be a string');
  }

  // 只允许字母、数字、下划线，长度 3-20
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * 验证密码强度
 * 规则：至少 8 字符，必须包含大写字母、小写字母、数字、特殊字符
 * @param {string} password - 待验证的密码
 * @returns {boolean} 密码是否符合强度要求
 * @throws {Error} 如果 password 不是字符串类型
 */
function validatePassword(password) {
  if (typeof password !== 'string') {
    throw new Error('Password must be a string');
  }

  // 要求：至少 8 字符、包含大写字母、小写字母、数字、特殊字符
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  return hasMinLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
}

/**
 * 比较两个任意值是否相等（对象会进行深度比较）
 * @param {*} value1 - 第一个值
 * @param {*} value2 - 第二个值
 * @returns {boolean} 两个值是否相等
 */
function isEqualValue(value1, value2) {
  return _.isEqual(value1, value2);
}

module.exports = {
  validateEmail,
  validateUsername,
  validatePassword,
  isEqualValue
};
