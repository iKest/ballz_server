const md5 = require('md5');
const util = require('util');

const { inspect } = util;
const { toString } = Object.prototype;

const stringify = val => {
    const str = String(val);

    return str === toString.call(val) ? inspect(val) : str;
};

const isObject = o => o !== null && typeof o === 'object' && Array.isArray(o) === false;

const summ = obj =>
    Object.keys(obj)
        .sort()
        .reduce((result, key) => `${result + key}=${obj[key]}`, '');

const checkSignature = (keys, secret) => {
    const selfKeys = {};
    Object.assign(selfKeys, keys);
    delete selfKeys.sig;
    return keys.sig === md5(summ(selfKeys) + secret);
};

const calcSignature = (key, param1, param2, param3) => md5(param1 + key + param2 + key + param3);

module.exports = {
    checkSignature,
    calcSignature,
    stringify,
    isObject
};
