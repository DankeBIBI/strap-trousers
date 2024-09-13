/**小程序适配请求 */
import { __Config } from ".";
import { BuildRequestBody } from "./type";
import { formatHeaderParams, removeUrlInApiPool } from './utils'
/**
 * 小程序适配请求
 * @param url 
 * @param data 
 * @param method 
 * @returns 
 */
export async function miniRequest(e: BuildRequestBody) {
    let { url, method, data, name } = e
    const config = __Config[name]
    await formatHeaderParams(config)
    method = method ?? __Config[name].defaultMethod
    const header = config.headers
    const timeout = config.timeout
    url = config.rootUrl + url
    return new Promise<void>((resolve, reject) => {
        config.lib({
            url, header, data, method, timeout, ...config.params,
            success: (res: any) => {
                removeUrlInApiPool(url)
                if (res.statusCode == 200 || res.statusCode == config.injectStateCode) {
                    config.interceptors?.success && config.interceptors?.success(res.data)
                    resolve(res.data)
                } else {
                    config.interceptors?.fail && config.interceptors.fail(res.data)
                    reject(res.data)
                }
            },
            fail: (error: any) => {
                removeUrlInApiPool(url)
                config.interceptors?.requestFail && config.interceptors.requestFail(error)
                reject(error)
            }
        })
    })
}