import { __Config } from '../strawApi'
import { axiosRequest } from '../strawApi/axios'
import { miniRequest } from '../strawApi/mini'
import { ApiPool } from '../strawApi/store'
import { createOptions } from '../strawApi/type'

type PropertyDescriptorPlus = PropertyDescriptor & {
  url?: string
  method?: string
}

/**创建连接体 */
export function ConnectStrawPlus<T extends createOptions>(config: T) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const body = config.lib?.Axios ? axiosRequest : miniRequest
    __Config[config.name] = config
    Object.assign(constructor, {
      config,
      getRequest: (e: any) => body(e),
    })
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)
        throw new Error(`禁止将 - ${config.name} -实例化`)
      }
    }
  }
}

function createRequestDecorator(method: string) {
  return function (url: string) {
    return function (target: any, _propertyKey: string, descriptor: PropertyDescriptorPlus) {
      descriptor.url = url
      descriptor.method = method
      descriptor.value = (dataOrParams: any) => {
        const requestData = {
          name: target.config.name,
          url,
          data:
            method === 'GET' || method === 'DELETE'
              ? { ...target.config.data }
              : { ...dataOrParams, ...target.config.data },
          params: method === 'GET' || method === 'DELETE' ? dataOrParams : undefined,
          method,
        }
        return target.getRequest(requestData)
      }
    }
  }
}

/**防抖 */
export function Debounce() {
  return function (
    target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptorPlus & {
      debounce?: boolean
    }
  ) {
    if (!descriptor.url) {
      descriptor.debounce = true
      return
    }
    // const originalMethod = descriptor.value
    descriptor.value = (value: any) => {
      const params =
        descriptor.method === 'GET' || descriptor.method === 'DELETE'
          ? { ...target.config.params, ...value }
          : target.config.params
      const data =
        descriptor.method === 'POST' || descriptor.method === 'PUT'
          ? { ...target.config.data, ...value }
          : target.config.data
      ApiPool.set(descriptor.url as string, 'running')
      const values = {
        name: target.config.name,
        url: descriptor.url,
        data,
        params,
        method: descriptor.method,
      }
      return target.getRequest(values)
    }
  }
}
/**执行Post请求 */
export const Post = createRequestDecorator('POST')

/**执行Get请求 */
export const Get = createRequestDecorator('GET')

/**执行Put请求 */
export const Put = createRequestDecorator('PUT')

/**执行Delete请求 */
export const Delete = createRequestDecorator('DELETE')
