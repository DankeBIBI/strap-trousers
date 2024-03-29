interface params {
    /**设置字符串长度 默认 8位 */
    length?: number,
    /**设置字符串前缀 默认 空 */
    prefix?: string,
    /**suffix 设置字符串后缀 默认 空 */
    suffix?: string,
    /**设置字符串是否含有符号 默认 false */
    hasSymbol?: boolean,
    /**设置字符串是否含有数字 默认 true */
    hasNumber?: boolean,
    /**设置字符串是否含有小写字母 默认 true */
    hasLowercase?: boolean,
    /**设置字符串是否含有大写字母 默认 false */
    hasUppercase?: boolean,
    /**设置长度是否包括前后缀 默认true */
    includePrefixAndSuffix?: boolean
}
/**@author DANKEBIBI <1580074116@qq.com>
 * 返回指定长度随机字符串
 * @params  {number} length 设置字符串长度 默认 8位
 * @params  {string} prefix 设置字符串前缀 默认 空
 * @params  {string} suffix 设置字符串后缀 默认 空
 * @params  {boolean} hasSymbol 设置字符串是否含有符号 默认 false
 * @params  {boolean} hasNumber 设置字符串是否含有数字 默认 true
 * @params  {boolean} hasLowercase 设置字符串是否含有小写字母 默认 true
 * @params  {boolean} hasUppercase 设置字符串是否含有大写字母 默认 false
 * @params  {boolean} includePrefixAndSuffix 设置长度是否包括前后缀 默认true
 * @returns 
 * @link www.dankebibi.cc 
 */
export const DKID = (params?: params) => {
    const _Symbol: string = `-_+`
    const _Number: string = '0123456789'
    const _Lowercase: string = 'abcdefghijklmnopqrstuvwxyz'
    const _Uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let Length = params?.length ?? 8
    let HasNumber = params?.hasNumber ?? true
    let HasLowercase = params?.hasLowercase ?? true
    if (Length > 100 || Length < 1)
        throw 'length值在1~100之间'
    if (params?.includePrefixAndSuffix) {
        if (params?.prefix)
            Length -= params.prefix.length
        if (params?.suffix)
            Length -= params.suffix.length
    }
    let list = [] as Array<any>
    params?.hasSymbol && list.push(_Symbol)
    HasNumber && list.push(_Number)
    HasLowercase && list.push(_Lowercase)
    params?.hasUppercase && list.push(_Uppercase)
    if (list.length == 0)
        throw '至少包含一种字符'
    list.reverse()
    let value = ''
    for (let index = 0; index < Length; index++) {
        //在list取哪一组
        const random_Type = Math.floor(Math.random() * list.length)
        //在哪一组取哪一个下标
        const random_list_length = Math.floor(Math.random() * (list[random_Type].length - 1))
        //拼接字符串
        value = value + list[random_Type][random_list_length]
    }
    if (params?.prefix)
        value = params.prefix + value
    if (params?.suffix)
        value = value + params.suffix
    return value
}