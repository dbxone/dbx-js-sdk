const toString = Object.prototype.toString;

function upperCaseFirst(str) {
  if (typeof str === 'string') {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  return str;
}

function isType(type) {
  return obj => toString.call(obj) === `[object ${upperCaseFirst(type)}]`;
}

export const isArray = isType('array');
export const isObject = isType('object');
export const isNumber = isType('number');
export const isString = isType('string');
export const isWindow = isType('window');
export const isBoolean = isType('boolean');
export const isFunction = isType('function');
export const isUndefined = isType('undefined');

export function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}
