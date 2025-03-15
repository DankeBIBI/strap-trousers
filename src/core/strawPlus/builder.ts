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
        const body = config.lib?.Axios ? axiosRequest : miniRequest;
        __Config[config.name] = config;
        Object.assign(constructor, {
            config,
            getRequest: (e: any) => body(e)
        });
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                throw new Error(`禁止将 - ${config.name} -实例化`);
            }
        }
    }
}

function createRequestDecorator(method: string) {
    return function (url: string) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptorPlus) {
            descriptor.url = url;
            descriptor.method = method;
            descriptor.value = (dataOrParams: any) => {
                const requestData = {
                    name: target.config.name,
                    url,
                    data: method === 'get' || method === 'delete' ? { ...target.config.data } : { ...dataOrParams, ...target.config.data },
                    params: method === 'get' || method === 'delete' ? dataOrParams : undefined,
                    method
                };
                return target.getRequest(requestData);
            }
        }
    }
}

/**执行Post请求 */
export const Post = createRequestDecorator('post');

/**执行Get请求 */
export const Get = createRequestDecorator('get');

/**执行Put请求 */
export const Put = createRequestDecorator('put');

/**执行Delete请求 */
export const Delete = createRequestDecorator('delete');

/**防抖 */
export function Debounce() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptorPlus) {
        if (!descriptor.url) throw new Error(`请将 @Debounce 装饰器置于请求装饰器上方`);
        const originalMethod = descriptor.value;
        descriptor.value = (value: any) => {
            const params = descriptor.method === 'get' || descriptor.method === 'delete' ? { ...target.config.params, ...value } : target.config.params;
            const data = descriptor.method === 'post' || descriptor.method === 'put' ? { ...target.config.data, ...value } : target.config.data;
            ApiPool.set(descriptor.url as string, 'running');
            return target.getRequest({
                name: target.config.name,
                url: descriptor.url,
                data,
                params,
                method: descriptor.method
            });
        }
    }
}