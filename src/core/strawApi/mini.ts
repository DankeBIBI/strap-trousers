/**小程序适配请求 */
import { __Config } from "."
import { BuildRequestBody } from "./type"
import { formatHeaderParams, removeUrlInApiPool } from './utils'

/**
 * 小程序适配请求
 * @param e BuildRequestBody
 * @returns Promise
 */
export async function miniRequest(e: BuildRequestBody) {
    let { url, method, data, name, headers } = e
    const config = __Config[name]

    // 深拷贝后格式化，避免并发请求时 header 解析乱序
    const cloned = JSON.parse(JSON.stringify(config))
    await formatHeaderParams(cloned)

    method = method ?? config.defaultMethod
    const header = { ...cloned.headers, ...headers }
    const timeout = config.timeout
    // 修复：避免双斜杠
    const base = config.rootUrl.replace(/\/$/, '')
    url = base + '/' + url.replace(/^\//, '')

    return new Promise<void>((resolve, reject) => {
        config.lib({
            url, header, data, method, timeout, ...cloned.params,
            success: (res: any) => {
                removeUrlInApiPool(url)
                if (res.statusCode == 200 || res.statusCode == config.injectStateCode) {
                    config.interceptors?.success?.(res.data)
                    resolve(res.data)
                } else {
                    config.interceptors?.fail?.(res.data)
                    reject(res.data)
                }
            },
            fail: (error: any) => {
                removeUrlInApiPool(url)
                config.interceptors?.requestFail?.(error)
                reject(error)
            }
        })
    })
}
