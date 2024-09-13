import { axiosRequest } from "./axios";
import { ApiPool, Straw } from "./store";
import { miniRequest } from './mini'
import { createActionCallbackDto, createActionInsertDto, createOptions, requestBodyDto, requestConfig, requestConfigTypeOfObject, StrawCallback } from "./type";
export let __Config = {} as createOptions
/**
 * StrawApi 
 * 轻松封装接口
 * @description 
 * @link [Gitee]  https://gitee.com/dankebibi/storm-eggshell
 * @link [Github]  https://github.com/DankeBIBI/strap-trousers
 * @author DANKEBIBI <1580074116@qq.com>
 * @example
 * -
 * 
 * 🌿 更好的类型支持 （TypeScript)
 * 最少只需在创建的connectStraw函数中中添加 rootUrl 与 添加一个Action 即可完成封装
 * 
 * const api = connectStraw({
 *  config:{
 *      name:'api1',
 *      rootUrl:'localhost:8202/',
 *  },
 *  action:{
 *      getList:()=>({
 *          url:'example/list',
 *          post:'GET'
 *      })
 *  }
 * })
 * 
 * api.getList()
 * 
 * -
 *
 */
export function connectStraw<T extends Function | createActionInsertDto<T>, K extends createOptions>(options: {
    config: K,
    action: T | ((e: {
        POST: any
        GET: any
        DELETE: any
        PUT: any
    }) => T)
}): createActionCallbackDto<T, K['responseData'], K> {
    const { config, action } = options
    __Config = config
    if (!config.lib) throw '请添加lib'
    requestBody.set(config.lib)
    return {
        ...buildAction<T>(action, config.name),
        __Straw: Straw,
        __ApiPool: ApiPool,
        __Config: config
    }
}

/**生成请求方法 */
function buildAction<T>(params: any, name: string) {
    if (Straw.get(name)) throw `'重复定义' -- ${name}`
    let map: any = {}
    params = params as requestConfigTypeOfObject[] | requestConfig[]
    function setMap(i: any, url: string, method: string, debounce?: boolean) {
        map[i] = async (params: any) => {
            if (debounce) {
                if (ApiPool.get(url) === 'running') return 'running'
                await ApiPool.set(url, 'running')
            }
            return requestBody.get(url, { ...params, ...__Config.data }, method)
        }
    }
    for (const i in params) {
        if (params[i] && typeof params[i] === 'function') {
            let fn: any = params[i]
            let { url, method, debounce } = fn() as requestConfig
            setMap(i, url, method, debounce)
        }
        if (params[i] && typeof params[i] === 'object') {
            setMap(i, params[i].url, params[i].method, params[i].debounce)
        }
    }
    Straw.set(name, map)
    return map as createActionCallbackDto<T, T, any>
}
/**请求体 */
const requestBody = (function () {
    let body = '' as any
    return {
        set: (lib: requestBodyDto) => {
            if (lib?.Axios)
                body = axiosRequest
            else
                body = miniRequest
        },
        get: (url: string, params: string, method: string) => body(url, params, method)
    }
})()