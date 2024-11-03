import { __Config } from '../strawApi'
import { axiosRequest } from '../strawApi/axios'
import { miniRequest } from '../strawApi/mini'
import { ApiPool } from '../strawApi/store'
import { createOptions } from '../strawApi/type'
import { removeUrlInApiPool } from '../strawApi/utils'

type PropertyDescriptorPlus = PropertyDescriptor & {
    url?: string,
    method?: string
}
/**创建连接体 */
export function ConnectStrawPlus<T extends createOptions>(config: T) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        let body = '' as any
        if (config.lib?.Axios)
            body = axiosRequest
        else
            body = miniRequest
        __Config[config.name] = config
        Object.assign(constructor, {
            config,
            getRequest: (e: any) => body(e)
        })
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args)
                throw new Error(`禁止将 - ${config.name} -实例化`)
            }
        }
    }
}
/**执行Post请求 */
export function Post(url: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptorPlus) {
        descriptor.url = url
        descriptor.method = 'post'
        descriptor.value = (data: any) => {
            return target.getRequest({
                name: target.config.name,
                url,
                data: { ...data, ...target.config.data },
                method: 'post'
            })
        }
    }
}
/**执行Get请求 */
export function Get(url: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptorPlus) {
        descriptor.url = url
        descriptor.method = 'get'
        descriptor.value = (params: any) => {
            return target.getRequest({
                name: target.config.name,
                url,
                data: { ...target.config.data },
                params,
                method: 'get'
            })
        }
    }
}
/**执行Put请求 */
export function Put(url: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptorPlus) {
        descriptor.url = url
        descriptor.method = 'put'
        descriptor.value = (data: any) => {
            return target.getRequest({
                name: target.config.name,
                url,
                data: { ...data, ...target.config.data },
                method: 'put'
            })
        }
    }
}
/**执行Delete请求 */
export function Delete(url: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptorPlus) {
        descriptor.url = url
        descriptor.method = 'delete'
        descriptor.value = (params: any) => {
            return target.getRequest({
                name: target.config.name,
                url,
                data: { ...target.config.data },
                params,
                method: 'delete'
            })
        }
    }
}
/**防抖 */
export function Debounce() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptorPlus) {
        if (!descriptor.url) throw new Error(`请将 @Debounce 装饰器置于请求装饰器上方`)
        let fn = descriptor.value
        console.log("🚀 -- 》》 ~ descriptor.url:", descriptor.url)
        descriptor.value = (value: any) => {
            let params = descriptor.method === 'get' || descriptor.method === 'delete' ? { ...target.config.params, ...value } : target.config.params
            let data = descriptor.method === 'post' || descriptor.method === 'put' ? { ...target.config.data, ...value } : target.config.data
            ApiPool.set(descriptor.url as string, 'running')
            return target.getRequest({
                name: target.config.name,
                url: descriptor.url,
                data,
                params,
                method: descriptor.method
            })

        }
    }
}