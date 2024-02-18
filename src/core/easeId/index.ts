interface params {
    length?: number,
    prefix?: string,
    suffix?: string,
    hasSymbol?: boolean,
    hasNumber?: boolean,
    hasLowercase?: boolean,
    hasUppercase?: boolean,
    includePrefixAndSuffix?: boolean
}
class _DKID {
    private _Length?: number | any
    private _prefix?: string
    private _suffix?: string
    private _hasSymbol?: boolean
    private _hasNumber?: boolean
    private _hasLowercase?: boolean
    private _hasUppercase?: boolean
    private _includePrefixAndSuffix?: boolean
    private _Symbol: string = `-  _  +  `
    private _Number: string = '0123456789'
    private _Lowercase: string = 'abcdefghijklmnopqrstuvwxyz'
    private _Uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    constructor(params: params | any) {
        const {
            length,
            prefix,
            suffix,
            hasSymbol,
            hasNumber,
            hasLowercase,
            hasUppercase,
            includePrefixAndSuffix
        } = params
        this._Length = length < 8 ? 8 : length ? length : 8
        this._prefix = prefix
        this._suffix = suffix
        this._hasSymbol = hasSymbol ?? false
        this._hasNumber = hasNumber ?? true
        this._hasLowercase = hasLowercase ?? true
        this._hasUppercase = hasUppercase ?? false
        this._includePrefixAndSuffix = includePrefixAndSuffix ?? false
        if (this._Length > 100 || this._Length < 1)
            throw 'length值在1~100之间'
        if (this._includePrefixAndSuffix) {
            if (prefix)
                this._Length -= prefix.length
            if (suffix)
                this._Length -= suffix.length
        }
    }
    init() {
        let list = [] as Array<any>
        if (this._hasSymbol)
            list.push(this._Symbol)
        if (this._hasNumber)
            list.push(this._Number)
        if (this._hasLowercase)
            list.push(this._Lowercase)
        if (this._hasUppercase)
            list.push(this._Uppercase)
        if (list.length == 0)
            throw '至少包含一种字符'
        list.reverse()
        const _Length = this._Length
        let _data: any = ''
        for (let index = 0; index < _Length; index++) {
            //在list取哪一组
            const random_Type = Math.floor(Math.random() * list.length)
            //在哪一组取哪一个下标
            const random_list_length = Math.floor(Math.random() * (list[random_Type].length - 1))
            //拼接字符串
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
 * @params  {boolean} hasNumber 设置字符串是否含有数字 默认 true
 * @params  {boolean} hasLowercase 设置字符串是否含有小写字母 默认 true
 * @params  {boolean} hasUppercase 设置字符串是否含有大写字母 默认 true
 * @params  {boolean} includePrefixAndSuffix 设置长度是否包括前后缀 默认true
 * @returns 
 * @link www.dankebibi.cc 
 */
export const DKID = (params?: params) => {
    const fn = new _DKID(params ?? '')
    return fn.init()
}