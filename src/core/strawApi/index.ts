import { axiosRequest } from './axios'
import { miniRequest } from './mini'
import { ApiPool, Straw } from './store'
import { ActionDto, BuildRequestBody, createActionCallbackDto, createActionInsertDto, createOptions, Methods, requestBodyDto, requestConfig, requestConfigTypeOfObject, StrawCallback, strawInstance } from './type'
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
 *          method:'GET'
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
    if (!config.lib) throw '请添加的请求库--lib'
    if (!config.name) throw '请添加唯一标识--name'
    // 存入全局配置表，供 axios/mini 请求时按 name 查找
    __Config[config.name] = config

    // 为每个实例创建独立的请求处理器
    const req = createRequestBody(config.lib as requestBodyDto)
    const result = {
        ...buildAction<T, K, K['responseData']>(action as createActionInsertDto<T> | ((Q: StrawCallback<K>) => T), config, req),
        __Straw: Straw,
        __ApiPool: ApiPool,
        __Config: config,
    }
    return result as any
}

/**创建请求体工厂（每实例独立，无全局状态） */
function createRequestBody(lib: requestBodyDto | any) {
    const isAxios = lib?.Axios || (lib && typeof lib.create === 'function')
    const handler = isAxios ? axiosRequest : miniRequest
    return {
        get: (e: BuildRequestBody) => handler(e)
    }
}

/**生成请求方法 */
function buildAction<T, K, C>(
    action: createActionInsertDto<T> | ((Q: StrawCallback<K>) => T),
    config: K,
    req: { get: (e: BuildRequestBody) => any }
) {
    const cfg = config as createOptions
    const name = cfg.name as string
    if (Straw.get(name)) throw `'重复定义' -- ${name}`
    let map: any = {}
    const params = action as requestConfigTypeOfObject[] | requestConfig[]

    const setMap = (i: any, url: string, method: string, debounce?: boolean) => {
        map[i] = async (p: any) => {
            if (debounce) {
                if (ApiPool.get(url) === 'running') return 'running'
                await ApiPool.set(url, 'running')
            }
            // 修复：user参数在前，config.data在后（后者可覆盖）
            return req.get({
                name,
                url,
                data: { ...p, ...cfg.data },
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
        return req.get({
            name,
            method,
            ...e,
            // 修复：user参数在前，config.data在后
            data: { ...e.data, ...cfg.data },
        }) as K
    }

    if (typeof action === 'function') {
        map = action({
            POST: e => ActionMap(e, 'POST'),
            GET: e => ActionMap(e, 'GET'),
            PUT: e => ActionMap(e, 'PUT'),
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
