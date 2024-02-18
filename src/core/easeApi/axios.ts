import axios, { Axios } from "axios";
import { BEFORE_REQUEST, DEFAULT_METHOD, FAIL, HEADERS, PARAMS, REQUEST_FAIL, REQUEST_SUCCESS, ROOT_URL, SHOW_LOG, TIME_OUT } from ".";

export async function getAxios() {
    // const _this = this
    for (const i in HEADERS) {
        if (typeof HEADERS[i] == 'function') {
            HEADERS[i] = await HEADERS[i]()
            if (SHOW_LOG) console.log(`执行了 ${i} 方法,结果为 ${HEADERS[i]}`,);
        }
    }
    for (const i in PARAMS) {
        if (typeof PARAMS[i] == 'function') {
            PARAMS[i] = await PARAMS[i]()
            if (SHOW_LOG) console.log(`执行了 ${i} 方法,结果为 ${PARAMS[i]}`);
        }
    }
    return axios.create({
        HEADERS,
        timeout: TIME_OUT ?? 5000,
        baseURL: ROOT_URL,
        ...PARAMS
    }) as axiosDto | any
}
export async function axiosRequest(url: string | number, data: any, method: string | undefined = DEFAULT_METHOD) {
    let params: axiosRequsetDto = { url, method }
    params[method == 'GET' ? 'params' : 'data'] = data
    let axios = await getAxios()
    interceptors(axios)
    return (await axios(params)).data
}
/**拦截器 */
function interceptors(Axios: Axios) {
    //请求前
    Axios.interceptors.request.use((data: any) => {
        if (BEFORE_REQUEST)
            BEFORE_REQUEST!(data)
        return data
    },
        //请求失败
        (error: any) => {
            if (REQUEST_FAIL)
                REQUEST_FAIL!(error)
            return Promise.reject(error)
        })
    //响应状态码2XX时
    Axios.interceptors.response.use((res: any) => {
        if (REQUEST_SUCCESS)
            REQUEST_SUCCESS!(res.data)
        return res
    },
        //响应状态码不在2XX时
        (error: any) => {
            if (FAIL)
                FAIL!(error.data)
            return Promise.reject(error)
        })
}