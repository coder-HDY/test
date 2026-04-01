/**
 * 生成今天的日期
 * @returns {Object} { year, month, day } 格式的日期对象
 */
function getCurrentDate() {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    dateString: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  };
}

/**
 * 计算两个日期之间的差值
 * @param {Date|string} date1 - 第一个日期，可以是Date对象或'YYYY-MM-DD'格式的字符串
 * @param {Date|string} date2 - 第二个日期，可以是Date对象或'YYYY-MM-DD'格式的字符串
 * @returns {Object} { days, hours, minutes, totalSeconds } 格式的差值对象
 */
function getDateDiff(date1, date2) {
  // 转换为Date对象
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  // 验证时间
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Invalid date format');
  }

  // 计算差值（毫秒）
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days,
    hours,
    minutes,
    totalSeconds
  };
}

/**
 * 判断给定日期是星期几
 * @param {Date|string} date - 日期，可以是Date对象或'YYYY-MM-DD'格式的字符串
 * @returns {Object} { day, dayIndex, dayName } dayIndex: 0=周日, 1=周一, ..., 6=周六
 */
function getDayOfWeek(date) {
  const dayMap = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  };

  const dayMapEn = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };

  // 转换为Date对象
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date format');
  }

  const dayIndex = targetDate.getDay();

  return {
    day: targetDate.getDate(),
    dayIndex,
    dayName: dayMap[dayIndex],
    dayNameEn: dayMapEn[dayIndex],
    fullDate: `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`
  };
}

module.exports = {
  getCurrentDate,
  getDateDiff,
  getDayOfWeek
};
