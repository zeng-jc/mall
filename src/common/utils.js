/**
 * 格式化日期函数 
 */
export function dateFormat(stamp = null, format = "YYYY-MM-DD HH:mm:ss") {
  const date = new Date(stamp);
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }
  for (const key in config) {
    format = format.replace(key, addZero(config[key]));
  }
  return format;
}

function addZero(date) {
  const strs = date.toString();
  if (strs.length <= 1) return ('00' + date).substr(strs.length);
  return strs;
}

/**
 * 防抖函数
 */
export function debounce(fn, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, args);
    }, delay)
  }
}