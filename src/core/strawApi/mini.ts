/**小程序适配请求 */
import { __Config } from ".";
import { formatHeaderParams, removeUrlInApiPool } from './utils'
/**
 * 小程序适配请求
 * @param url 
 * @param data 
 * @param method 
 * @returns 
 */
export async function miniRequest(url: string, data: any, method?: string) {
    await formatHeaderParams(__Config)
    method = method ?? __Config.defaultMethod
    const header = __Config.headers
    const timeout = __Config.timeout
    return new Promise<void>((resolve, reject) => {
        __Config.lib({
            url, header, data, method, timeout, ...__Config.params,
            success: (res: any) => {
                removeUrlInApiPool(url)
                if (res.statusCode == 200 || res.statusCode == __Config.injectStateCode) {
                    __Config.interceptors?.success && __Config.interceptors?.success(res.data)
                    resolve(res.data)
                } else {
                    __Config.interceptors?.fail && __Config.interceptors.fail(res.data)
                    reject(res.data)
                }
            },
            fail: (error: any) => {
                removeUrlInApiPool(url)
                __Config.interceptors?.requestFail && __Config.interceptors.requestFail(error.data)
                reject(error.data)
            }
        })
    })
}