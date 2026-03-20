import { axiosRequest } from '../strawApi/axios'
import { miniRequest } from '../strawApi/mini'
import { ApiPool } from '../strawApi/store'
import { createOptions } from '../strawApi/type'

type PropertyDescriptorPlus = PropertyDescriptor & {
  url?: string
  method?: string
  debounce?: boolean
  _debounceTimer?: ReturnType<typeof setTimeout>
}

function stripSlashes(url: string, base: string) {
  return base.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
}

/**创建连接体 */
export function ConnectStrawPlus<T extends createOptions>(config: T) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const isAxios = config.lib?.Axios || (config.lib && typeof config.lib.create === 'function')
    const body = isAxios ? axiosRequest : miniRequest

    Object.assign(constructor, {
      config,
      getRequest: (e: any) => body(e),
    })

    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)
        throw new Error(`禁止将 - ${config.name} - 实例化`)
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
        const { config } = target
        const isQuery = method === 'GET' || method === 'DELETE'
        const requestData = {
          name: config.name,
          url: stripSlashes(url, config.rootUrl),
          data: isQuery ? config.data : { ...dataOrParams, ...config.data },
          params: isQuery ? { ...dataOrParams, ...config.params } : undefined,
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
    descriptor: PropertyDescriptorPlus
  ) {
    if (!descriptor.url) {
      descriptor.debounce = true
      return
    }
    descriptor.value = (value: any) => {
      const { config } = target
      const url = descriptor.url as string
      const method = descriptor.method as string
      const isQuery = method === 'GET' || method === 'DELETE'

      // 检查是否已有运行中的请求
      if (ApiPool.get(url) === 'running') return Promise.resolve('running')

      // 标记为运行中
      ApiPool.set(url, 'running')

      const data = isQuery ? config.data : { ...value, ...config.data }
      const params = isQuery ? { ...value, ...config.params } : undefined

      const reqData = {
        name: config.name,
        url: stripSlashes(url, config.rootUrl),
        data,
        params,
        method,
      }

      const req = target.getRequest(reqData)
      // 请求结束后从池中移除
      Promise.resolve(req).finally(() => {
        ApiPool.delete(url)
      })

      return req
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
