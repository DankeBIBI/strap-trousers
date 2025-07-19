// import axios from "axios";
import { __Config } from '.'
import { deepClone } from '../../common'
import { ActionDto, BuildRequestBody } from './type'
import { formatHeaderParams, removeUrlInApiPool } from './utils'
/**【Axios】 -- 获取请求体 */
async function getAxios(name: string) {
  const config = __Config[name]
  return config.lib.create({
    timeout: config.timeout ?? 5000,
    baseURL: config.rootUrl,
    ...config.params,
    ...(await formatHeaderParams(deepClone(config))),
  }) as axiosDto | any
}
/**【Axios】 -- 发起请求 */
export async function axiosRequest(e: BuildRequestBody & ActionDto) {
  let { url, method, data, name, headers, signal, params } = e
  const state = method == 'GET' || method == 'DELETE'
  let values: IAxiosRequestDto = { url, method, signal }
  values[state ? 'params' : 'data'] = state ? params : data
  let Axios = await getAxios(name)
  interceptors({ Axios, url, name, headers })
  return (await Axios(values)).data
}
/**【Axios】 -- 拦截器 */
function interceptors(e: { Axios: any; url: string; name: string; headers: any }) {
  const { Axios, url, name, headers } = e
  let config = __Config[name]
  /**【Axios】 -- 请求前 */
  Axios.interceptors.request.use(
    (data: any) => {
      data.headers = {
        ...data.headers,
        ...headers,
      }
      config.interceptors?.beforeRequest?.(data)
      return data
    },
    /**【Axios】 -- 请求失败时 */
    (error: any) => {
      config.interceptors?.requestFail?.(error)
      removeUrlInApiPool(url)
      return Promise.reject(error)
    }
  )
  /**【Axios】 -- 响应状态码2XX时 */
  Axios.interceptors.response.use(
    (res: any) => {
      config.interceptors?.success?.(res)
      removeUrlInApiPool(url)
      return res
    },
    /**【Axios】 -- 响应状态码不在2XX时 */
    (error: any) => {
      config.interceptors?.fail?.(error)
      removeUrlInApiPool(url)
      return Promise.reject(error)
    }
  )
}
