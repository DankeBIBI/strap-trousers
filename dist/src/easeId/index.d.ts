interface params {
    length?: number;
    prefix?: string;
    suffix?: string;
    hasSymbol?: boolean;
    includePrefixAndSuffix?: boolean;
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
export declare const DKID: (params?: params | undefined) => any;
export {};
