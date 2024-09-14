import { axiosRequest } from "./axios";
import { ApiPool, Straw } from "./store";
import { miniRequest } from './mini'
import { ActionDto, BuildRequestBody, createActionCallbackDto, createActionInsertDto, createOptions, Methods, requestBodyDto, requestConfig, requestConfigTypeOfObject, StrawCallback, strawInstance } from "./type";
export let __Config: { [key: string | number]: createOptions } = {}
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
export function connectStraw<T extends createActionInsertDto<T>, F, K extends createOptions>(options: {
    config: K,
    action: ((Q: StrawCallback<K['responseData']>) => F) | T
}): F extends Object ? F & strawInstance<K> : createActionCallbackDto<T, K, K['responseData']> {
    const { config, action } = options
    __Config[config.name] = config
    if (!config.lib) throw '请添加的请求库--lib'
    if (!config.name) throw '请添加唯一标识--name'
    requestBody.set(config.lib)
    return {
        ...buildAction<T, K, K['responseData']>(action as createActionInsertDto<T> | ((Q: StrawCallback<K>) => T), config.name),
        __Straw: Straw,
        __ApiPool: ApiPool,
        __Config: config,
    } as any
}

/**生成请求方法 */
function buildAction<T, K, C>(action: createActionInsertDto<T> | ((Q: StrawCallback<K>) => T), name: string) {
    if (Straw.get(name)) throw `'重复定义' -- ${name}`
    let map: any = {}
    let params = action as requestConfigTypeOfObject[] | requestConfig[]
    const config = __Config[name]
    const setMap = (i: any, url: string, method: string, debounce?: boolean) => {
        map[i] = async (params: any) => {
            if (debounce) {
                if (ApiPool.get(url) === 'running') return 'running'
                await ApiPool.set(url, 'running')
            }
            return requestBody.get({
                name,
                url,
                data: { ...params, ...config.data },
                method
            })
        }
    }
    const ActionMap = async (e: ActionDto, method: Methods) => {
        const { debounce, url } = e
        if (debounce) {
            if (ApiPool.get(url) === 'running') return 'running'
            await ApiPool.set(url, 'running')
        }
        return requestBody.get({
            name,
            method,
            ...e,
            data: { ...params, ...__Config.data },
        }) as K

    }
    if (typeof action === 'function') {
        map = action({
            /**POST 请求 */
            POST: e => ActionMap(e, 'POST'),
            /**GET 请求 */
            GET: e => ActionMap(e, 'GET'),
            /**PUT 请求 */
            PUT: e => ActionMap(e, 'PUT'),
            /**DELETE 请求 */
            DELETE: e => ActionMap(e, 'DELETE'),
        }) as T
    } else {
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
    }
    Straw.set(name, map)
    return map as createActionCallbackDto<T, K, C>
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
        get: (e: BuildRequestBody) => body(e)
    }
})()