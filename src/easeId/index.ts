interface params {
    length?: number,
    prefix?: string,
    suffix?: string,
    hasSymbol?: boolean,
    includePrefixAndSuffix?: boolean
}
class _DKID {
    private _Length?: number | any
    private _prefix?: string
    private _suffix?: string
    private _hasSymbol?: boolean
    private _includePrefixAndSuffix?: boolean
    private _Symbol: string = `_${null}_`
    private _Number: string = '1234567890'
    private _Lowercase: string = 'abcdefghijklmnopqrstuvwxyz'
    private _Uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    constructor(params: params | any) {
        const { length, prefix, hasSymbol, suffix, includePrefixAndSuffix } = params
        this._Length = length < 8 ? 8 : length?length:8
        this._prefix = prefix
        this._suffix = suffix
        this._hasSymbol = hasSymbol ?? true
        this._includePrefixAndSuffix = includePrefixAndSuffix ?? true
        if (this._Length > 100 || this._Length < 8)
            throw 'length值在8~100之间'
        if (this._includePrefixAndSuffix) {
            if (prefix)
                this._Length -= prefix.length
            if (suffix)
                this._Length -= suffix.length
        }
    }
    init() {
        let list = [
            this._Symbol,
            this._Number,
            this._Lowercase,
            this._Uppercase,
        ]
        if (!this._hasSymbol)
            list.splice(0, 1)
        const _Length = this._Length
        let _data: any = ''
        for (let index = 0; index < _Length; index++) {
            const random_Type = Math.floor(Math.random() * list.length)
            const random_list_length = Math.floor(Math.random() * list[random_Type].length)
            _data = _data + list[random_Type][random_list_length]
        }
        if (this._prefix)
            _data = this._prefix + _data
        if (this._suffix)
            _data = _data + this._suffix
        return _data
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
export const DKID = (params?: params) => {
    const fn = new _DKID(params ?? '')
    return fn.init()
}