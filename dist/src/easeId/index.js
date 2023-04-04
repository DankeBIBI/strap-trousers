"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DKID = void 0;
class _DKID {
    constructor(params) {
        this._Symbol = `_${null}_`;
        this._Number = '1234567890';
        this._Lowercase = 'abcdefghijklmnopqrstuvwxyz';
        this._Uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const { length, prefix, hasSymbol, suffix, includePrefixAndSuffix } = params;
        this._Length = length < 8 ? 8 : length ? length : 8;
        this._prefix = prefix;
        this._suffix = suffix;
        this._hasSymbol = hasSymbol !== null && hasSymbol !== void 0 ? hasSymbol : true;
        this._includePrefixAndSuffix = includePrefixAndSuffix !== null && includePrefixAndSuffix !== void 0 ? includePrefixAndSuffix : true;
        if (this._Length > 100 || this._Length < 8)
            throw 'length值在8~100之间';
        if (this._includePrefixAndSuffix) {
            if (prefix)
                this._Length -= prefix.length;
            if (suffix)
                this._Length -= suffix.length;
        }
    }
    init() {
        let list = [
            this._Symbol,
            this._Number,
            this._Lowercase,
            this._Uppercase,
        ];
        if (!this._hasSymbol)
            list.splice(0, 1);
        const _Length = this._Length;
        let _data = '';
        for (let index = 0; index < _Length; index++) {
            const random_Type = Math.floor(Math.random() * list.length);
            const random_list_length = Math.floor(Math.random() * list[random_Type].length);
            _data = _data + list[random_Type][random_list_length];
        }
        if (this._prefix)
            _data = this._prefix + _data;
        if (this._suffix)
            _data = _data + this._suffix;
        return _data;
    }
}
/**@author DANKEBIBI <1580074116@qq.com>
 * 返回指定长度随机字符串
 * @params  {number} length 设置字符串长度 默认 8位
 * @params  {string} prefix 设置字符串前缀 默认 空
 * @params  {string} suffix 设置字符串后缀 默认 空
 * @params  {boolean} hasSymbol 设置字符串是否含有符号 默认 true
 * @params  {boolean} includePrefixAndSuffix 设置长度是否包括前后缀 默认true
 * @returns
 * @link www.dankebibi.cc
 */
const DKID = (params) => {
    const fn = new _DKID(params !== null && params !== void 0 ? params : '');
    return fn.init();
};
exports.DKID = DKID;
