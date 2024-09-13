import { ApiPool } from "./store"

/**
 * @description 格式化请求头
 */
export async function formatHeaderParams(__Config: any) {
    for (const i in __Config.headers) {
        if (typeof __Config.headers[i] == 'function')
            __Config.headers[i] = await __Config.headers[i]()
    }
    for (const i in __Config.params) {
        if (typeof __Config.params[i] == 'function') {
            __Config.params[i] = await __Config.params[i]()
        }
    }
    return {
        headers: __Config.headers,
        params: __Config.params
    }
}
/** 
 * @description 删除缓冲池中的标识 
 * */
export function removeUrlInApiPool(name: string) {
    ApiPool.delete(name)
}