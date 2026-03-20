import { ApiPool } from "./store"

/**
 * @description 格式化请求头中的函数值（原地修改）
 */
export async function formatHeaderParams(config: any) {
    if (config.headers) {
        for (const i in config.headers) {
            if (typeof config.headers[i] == 'function')
                config.headers[i] = await config.headers[i]()
        }
    }
    if (config.params) {
        for (const i in config.params) {
            if (typeof config.params[i] == 'function')
                config.params[i] = await config.params[i]()
        }
    }
}

/**
 * @description 删除缓冲池中的标识
 * */
export function removeUrlInApiPool(name: string) {
    ApiPool.delete(name)
}
