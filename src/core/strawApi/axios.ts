// import axios from "axios";
import { __Config } from ".";
import { deepClone } from "../../common";
import { BuildRequestBody } from "./type";
import { formatHeaderParams, removeUrlInApiPool } from './utils'
/**【Axios】 -- 获取请求体 */
async function getAxios(name: string) {
    const config = __Config[name]
    return config.lib.create({
        timeout: config.timeout ?? 5000,
        baseURL: config.rootUrl,
        ...config.params,
        ... await formatHeaderParams(deepClone((config)))
    }) as axiosDto | any
}
/**【Axios】 -- 发起请求 */
export async function axiosRequest(e: BuildRequestBody) {
    let { url, method, data, name } = e
    let params: axiosRequsetDto = { url, method }
    params[method == 'GET' ? 'params' : 'data'] = data
    let axios = await getAxios(name)
    interceptors(axios, url, name)
    return (await axios(params)).data
}
/**【Axios】 -- 拦截器 */
function interceptors(Axios: any, url: string, name: string) {
    let config = __Config[name]
    /**【Axios】 -- 请求前 */
    Axios.interceptors.request.use((data: any) => {
        config.interceptors?.beforeRequest && config.interceptors.beforeRequest!(data)
        return data
    },
        /**【Axios】 -- 请求失败时 */
        (error: any) => {
            config.interceptors?.requestFail && config.interceptors?.requestFail!(error)
            removeUrlInApiPool(url)
            return Promise.reject(error)
        })
    /**【Axios】 -- 响应状态码2XX时 */
    Axios.interceptors.response.use((res: any) => {
        config.interceptors?.success && config.interceptors?.success!(res)
        removeUrlInApiPool(url)
        return res
    },
        /**【Axios】 -- 响应状态码不在2XX时 */
        (error: any) => {
            config.interceptors?.fail && config.interceptors?.fail!(error)
            removeUrlInApiPool(url)
            return Promise.reject(error)
        })
}
