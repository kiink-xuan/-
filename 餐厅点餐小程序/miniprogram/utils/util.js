// utils/util.js — 通用工具函数

/**
 * 格式化价格显示
 * @param {number} price - 价格（分或元）
 * @returns {string} 格式化后的价格字符串
 */
function formatPrice(price) {
  return '¥' + (price / 100).toFixed(2);
}

/**
 * 格式化时间
 * @param {Date|string|number} date - 日期
 * @param {string} format - 格式字符串
 * @returns {string}
 */
function formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '';
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return format
    .replace('YYYY', year)
    .replace('MM', padZero(month))
    .replace('DD', padZero(day))
    .replace('HH', padZero(hour))
    .replace('mm', padZero(minute))
    .replace('ss', padZero(second));
}

/**
 * 补零
 */
function padZero(n) {
  return n < 10 ? '0' + n : '' + n;
}

/**
 * 防抖
 */
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流
 */
function throttle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 生成唯一 ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * 深拷贝
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 显示 Toast
 */
function showToast(title, icon = 'none', duration = 2000) {
  wx.showToast({ title, icon, duration });
}

/**
 * 显示加载中
 */
function showLoading(title = '加载中...') {
  wx.showLoading({ title, mask: true });
}

/**
 * 隐藏加载中
 */
function hideLoading() {
  wx.hideLoading();
}

/**
 * 确认弹窗
 */
function showConfirm(content, title = '提示') {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      success(res) {
        resolve(res.confirm);
      }
    });
  });
}

module.exports = {
  formatPrice,
  formatTime,
  padZero,
  debounce,
  throttle,
  generateId,
  deepClone,
  showToast,
  showLoading,
  hideLoading,
  showConfirm
};
