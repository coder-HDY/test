const { getCurrentDate, getDateDiff, getDayOfWeek, getTimestampDayDiff } = require('../../tools/dateTool');

describe('Date Tools Test Suite', () => {
  
  // ========== getCurrentDate 测试 ==========
  describe('getCurrentDate()', () => {
    it('应该返回正确的日期对象格式', () => {
      // Arrange
      const today = new Date();
      const expectedYear = today.getFullYear();
      const expectedMonth = today.getMonth() + 1;
      const expectedDay = today.getDate();

      // Act
      const result = getCurrentDate();

      // Assert
      expect(result).toHaveProperty('year');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('dateString');
      expect(result.year).toBe(expectedYear);
      expect(result.month).toBe(expectedMonth);
      expect(result.day).toBe(expectedDay);
    });

    it('应该返回有效的月份（1-12）', () => {
      // Arrange & Act
      const result = getCurrentDate();

      // Assert
      expect(result.month).toBeGreaterThanOrEqual(1);
      expect(result.month).toBeLessThanOrEqual(12);
    });

    it('应该返回有效的日期（1-31）', () => {
      // Arrange & Act
      const result = getCurrentDate();

      // Assert
      expect(result.day).toBeGreaterThanOrEqual(1);
      expect(result.day).toBeLessThanOrEqual(31);
    });

    it('dateString 应该遵循 YYYY-MM-DD 格式', () => {
      // Arrange & Act
      const result = getCurrentDate();
      const dateStringPattern = /^\d{4}-\d{2}-\d{2}$/;

      // Assert
      expect(result.dateString).toMatch(dateStringPattern);
    });
  });

  // ========== getDateDiff 测试 ==========
  describe('getDateDiff()', () => {
    it('应该正确计算相同日期的差值为0天', () => {
      // Arrange
      const date = new Date('2026-04-01');

      // Act
      const result = getDateDiff(date, date);

      // Assert
      expect(result.days).toBe(0);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(0);
      expect(result.totalSeconds).toBe(0);
    });

    it('应该正确计算一天的差值', () => {
      // Arrange
      const date1 = new Date('2026-04-01');
      const date2 = new Date('2026-04-02');

      // Act
      const result = getDateDiff(date1, date2);

      // Assert
      expect(result.days).toBe(1);
      expect(result.totalSeconds).toBe(86400); // 24 * 60 * 60
    });

    it('应该正确计算多天的差值', () => {
      // Arrange
      const date1 = new Date('2026-01-01');
      const date2 = new Date('2026-01-10');

      // Act
      const result = getDateDiff(date1, date2);

      // Assert
      expect(result.days).toBe(9);
      expect(result.totalSeconds).toBe(9 * 86400);
    });

    it('应该支持字符串格式的日期参数', () => {
      // Arrange
      const dateStr1 = '2026-04-01';
      const dateStr2 = '2026-04-03';

      // Act
      const result = getDateDiff(dateStr1, dateStr2);

      // Assert
      expect(result.days).toBe(2);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(0);
    });

    it('应该返回对象包含所有必需的属性', () => {
      // Arrange
      const date1 = new Date('2026-03-15');
      const date2 = new Date('2026-03-20');

      // Act
      const result = getDateDiff(date1, date2);

      // Assert
      expect(result).toHaveProperty('days');
      expect(result).toHaveProperty('hours');
      expect(result).toHaveProperty('minutes');
      expect(result).toHaveProperty('totalSeconds');
    });

    it('应该正确处理跨月份的日期差值', () => {
      // Arrange
      const date1 = new Date('2026-03-31');
      const date2 = new Date('2026-04-01');

      // Act
      const result = getDateDiff(date1, date2);

      // Assert
      expect(result.days).toBe(1);
    });

    it('应该正确处理跨年的日期差值', () => {
      // Arrange
      const date1 = new Date('2025-12-31');
      const date2 = new Date('2026-01-01');

      // Act
      const result = getDateDiff(date1, date2);

      // Assert
      expect(result.days).toBe(1);
    });

    it('应该在任意顺序调用时返回相同的结果（绝对差值）', () => {
      // Arrange
      const date1 = new Date('2026-01-01');
      const date2 = new Date('2026-01-05');

      // Act
      const result1 = getDateDiff(date1, date2);
      const result2 = getDateDiff(date2, date1);

      // Assert
      expect(result1.days).toBe(result2.days);
      expect(result1.totalSeconds).toBe(result2.totalSeconds);
    });

    it('无效的日期格式应该抛出错误', () => {
      // Arrange
      const invalidDate = 'invalid-date-format';

      // Act & Assert
      expect(() => getDateDiff(invalidDate, '2026-04-01')).toThrow('Invalid date format');
      expect(() => getDateDiff('2026-04-01', 'not-a-date')).toThrow('Invalid date format');
    });

    it('应该正确计算包含小时和分钟的差值', () => {
      // Arrange
      const date1 = new Date('2026-04-01T10:30:00');
      const date2 = new Date('2026-04-01T12:45:00');

      // Act
      const result = getDateDiff(date1, date2);

      // Assert
      expect(result.days).toBe(0);
      expect(result.hours).toBe(2);
      expect(result.minutes).toBe(15);
      expect(result.totalSeconds).toBe(2 * 3600 + 15 * 60); // 8100
    });
  });

  // ========== getDayOfWeek 测试 ==========
  describe('getDayOfWeek()', () => {
    it('应该返回正确的对象格式', () => {
      // Arrange
      const date = new Date('2026-04-01'); // 这是一个周三

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('dayIndex');
      expect(result).toHaveProperty('dayName');
      expect(result).toHaveProperty('dayNameEn');
      expect(result).toHaveProperty('fullDate');
    });

    it('应该正确识别周一', () => {
      // Arrange
      const date = new Date('2026-03-30'); // 周一

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.dayIndex).toBe(1);
      expect(result.dayName).toBe('星期一');
      expect(result.dayNameEn).toBe('Monday');
    });

    it('应该正确识别周二', () => {
      // Arrange
      const date = new Date('2026-03-31'); // 周二

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.dayIndex).toBe(2);
      expect(result.dayName).toBe('星期二');
      expect(result.dayNameEn).toBe('Tuesday');
    });

    it('应该正确识别周三', () => {
      // Arrange
      const date = new Date('2026-04-01'); // 周三

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.dayIndex).toBe(3);
      expect(result.dayName).toBe('星期三');
      expect(result.dayNameEn).toBe('Wednesday');
    });

    it('应该正确识别周四', () => {
      // Arrange
      const date = new Date('2026-04-02'); // 周四

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.dayIndex).toBe(4);
      expect(result.dayName).toBe('星期四');
      expect(result.dayNameEn).toBe('Thursday');
    });

    it('应该正确识别周五', () => {
      // Arrange
      const date = new Date('2026-04-03'); // 周五

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.dayIndex).toBe(5);
      expect(result.dayName).toBe('星期五');
      expect(result.dayNameEn).toBe('Friday');
    });

    it('应该正确识别周六', () => {
      // Arrange
      const date = new Date('2026-04-04'); // 周六

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.dayIndex).toBe(6);
      expect(result.dayName).toBe('星期六');
      expect(result.dayNameEn).toBe('Saturday');
    });

    it('应该正确识别周日', () => {
      // Arrange
      const date = new Date('2026-04-05'); // 周日

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.dayIndex).toBe(0);
      expect(result.dayName).toBe('星期日');
      expect(result.dayNameEn).toBe('Sunday');
    });

    it('应该支持字符串格式的日期参数', () => {
      // Arrange
      const dateStr = '2026-04-01'; // 周三

      // Act
      const result = getDayOfWeek(dateStr);

      // Assert
      expect(result.dayIndex).toBe(3);
      expect(result.dayName).toBe('星期三');
    });

    it('应该正确返回日期字符串（YYYY-MM-DD 格式）', () => {
      // Arrange
      const date = new Date('2026-04-01');

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.fullDate).toBe('2026-04-01');
    });

    it('应该返回正确的日期数字（1-31）', () => {
      // Arrange
      const date = new Date('2026-04-15');

      // Act
      const result = getDayOfWeek(date);

      // Assert
      expect(result.day).toBe(15);
    });

    it('无效的日期格式应该抛出错误', () => {
      // Arrange
      const invalidDate = 'not-a-valid-date';

      // Act & Assert
      expect(() => getDayOfWeek(invalidDate)).toThrow('Invalid date format');
    });

    it('应该处理闰年的日期', () => {
      // Arrange
      const leapYearDate = new Date('2024-02-29'); // 2024是闰年

      // Act
      const result = getDayOfWeek(leapYearDate);

      // Assert
      expect(result.day).toBe(29);
      expect(result.dayIndex).toBeGreaterThanOrEqual(0);
      expect(result.dayIndex).toBeLessThanOrEqual(6);
    });

    it('应该处理每月的第一天和最后一天', () => {
      // Arrange
      const firstDay = new Date('2026-04-01');
      const lastDay = new Date('2026-04-30');

      // Act
      const resultFirst = getDayOfWeek(firstDay);
      const resultLast = getDayOfWeek(lastDay);

      // Assert
      expect(resultFirst.day).toBe(1);
      expect(resultLast.day).toBe(30);
      expect(resultFirst.dayIndex).toBeDefined();
      expect(resultLast.dayIndex).toBeDefined();
    });
  });

  // ========== getTimestampDayDiff 测试 ==========
  describe('getTimestampDayDiff()', () => {
    it('应该正确计算整天差值', () => {
      // Arrange
      const ts1 = new Date('2026-04-01T00:00:00Z').getTime();
      const ts2 = new Date('2026-04-03T00:00:00Z').getTime();

      // Act
      const result = getTimestampDayDiff(ts1, ts2);

      // Assert
      expect(result).toBe(2);
    });

    it('应该将1.9天差值按天向上取整为2天', () => {
      // Arrange
      const ts1 = 0;
      const ts2 = Math.floor(1.9 * 24 * 60 * 60 * 1000);

      // Act
      const result = getTimestampDayDiff(ts1, ts2);

      // Assert
      expect(result).toBe(2);
    });

    it('应该正确处理相同时间戳为0天', () => {
      // Arrange
      const ts = new Date('2026-04-01T08:30:00Z').getTime();

      // Act
      const result = getTimestampDayDiff(ts, ts);

      // Assert
      expect(result).toBe(0);
    });

    it('应该在任意顺序传参时返回相同结果', () => {
      // Arrange
      const ts1 = new Date('2026-04-01T00:00:00Z').getTime();
      const ts2 = new Date('2026-04-02T06:00:00Z').getTime();

      // Act
      const result1 = getTimestampDayDiff(ts1, ts2);
      const result2 = getTimestampDayDiff(ts2, ts1);

      // Assert
      expect(result1).toBe(result2);
    });

    it('无效时间戳应抛出错误', () => {
      // Arrange
      const invalidTimestamp = 'not-a-timestamp';

      // Act & Assert
      expect(() => getTimestampDayDiff(invalidTimestamp, Date.now())).toThrow('Invalid timestamp');
      expect(() => getTimestampDayDiff(Date.now(), NaN)).toThrow('Invalid timestamp');
    });
  });
});
