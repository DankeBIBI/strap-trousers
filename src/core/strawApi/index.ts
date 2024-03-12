import { axiosRequest } from "./axios";
import { ApiPool, strawApis } from "./store";
import { createActionCallbackDto, createActionInsertDto, createOptions, requestConfig } from "./type";
export let __Config = {} as createOptions
/**
 * StrawApi 
 * 轻松封装接口
 * @description 
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
 * @link [Gitee]  https://gitee.com/dankebibi/storm-eggshell
 * @link [Github]  https://github.com/DankeBIBI/strap-trousers
 * @author DANKEBIBI <1580074116@qq.com>
 */
export function connectStraw<T extends createActionInsertDto<T, K>, K extends createOptions>(options: {
    config: K,
    action: T
}): createActionCallbackDto<T, K['responseData']> {
    const { config, action } = options
    __Config = config
    return buildAction(action, config.name)
}
/**生成请求方法 */
function buildAction<T>(params: T, name: string) {
    if (strawApis.get(name)) throw `'重复定义' -- ${name}`
    let map: any = {}
    for (const i in params) {
        if (params[i] && typeof params[i] === 'function') {
            let fn: any = params[i]
            let { url, method } = fn() as requestConfig
            map[i] = async (params: any) => {
                if (ApiPool.get(url) === 'running') return 'running'
                await ApiPool.set(url, 'running')
                return axiosRequest(url, {...params,...__Config.data}, method)
            }
        }
        if(params[i] && typeof params[i] === 'object'){
            let fn: any = params[i]['fn']
        }
    }
    strawApis.set(name, map)
    return map as createActionCallbackDto<T, T>
}