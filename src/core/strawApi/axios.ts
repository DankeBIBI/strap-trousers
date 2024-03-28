// import axios from "axios";
import { __Config } from ".";
import { formatHeaderParams, removeUrlInApiPool } from './utils'
/**【Axios】 -- 获取请求体 */
async function getAxios() {
    await formatHeaderParams(__Config)
    return __Config.lib.create({
        headers: __Config.headers,
        timeout: __Config.timeout ?? 5000,
        baseURL: __Config.rootUrl,
        ...__Config.params
    }) as axiosDto | any
}
/**【Axios】 -- 发起请求 */
export async function axiosRequest(url: string, data: any, method: string | undefined = __Config.defaultMethod ?? 'GET') {
    let params: axiosRequsetDto = { url, method }
    params[method == 'GET' ? 'params' : 'data'] = data
    let axios = await getAxios()
    interceptors(axios, url)
    return (await axios(params)).data
}
/**【Axios】 -- 拦截器 */
function interceptors(Axios: any, url: string) {
    /**【Axios】 -- 请求前 */
    Axios.interceptors.request.use((data: any) => {
        __Config.interceptors?.beforeRequest && __Config.interceptors.beforeRequest!(data)
        return data
    },
        /**【Axios】 -- 请求失败时 */
        (error: any) => {
            __Config.interceptors?.requestFail && __Config.interceptors?.requestFail!(error)
            removeUrlInApiPool(url)
            return Promise.reject(error)
        })
    /**【Axios】 -- 响应状态码2XX时 */
    Axios.interceptors.response.use((res: any) => {
        __Config.interceptors?.success && __Config.interceptors?.success!(res)
        removeUrlInApiPool(url)
        return res
    },
        /**【Axios】 -- 响应状态码不在2XX时 */
        (error: any) => {
            __Config.interceptors?.fail && __Config.interceptors?.fail!(error)
            removeUrlInApiPool(url)
            return Promise.reject(error)
        })
}
