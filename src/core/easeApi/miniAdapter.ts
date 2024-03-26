import { HEADERS, ROOT_URL, TIME_OUT, PARAMS, REQUEST_SUCCESS, FAIL, REQUEST_FAIL, MINI_ADAPTER, INJECT_STATE_CODE, DEFAULT_METHOD } from "."

/**小程序适配请求 */
export async function miniAdapterRequest(url: string | number, data: any, method?: string) {
    method = method ?? DEFAULT_METHOD
    const header = HEADERS
    const timeout = TIME_OUT
    url = ROOT_URL + '/' + url
    return new Promise<void>((resolve, reject) => {
        if (MINI_ADAPTER)
            MINI_ADAPTER({
                url, header, data, method, timeout, ...PARAMS,
                success: (res: any) => {
                    if (res.statusCode == 200 || res.statusCode == INJECT_STATE_CODE) {
                        if (REQUEST_SUCCESS)
                            REQUEST_SUCCESS!(res.data)
                        resolve(res.data)
                    } else {
                        if (FAIL)
                            FAIL!(res.data)
                        reject(res.data)
                    }
                },
                fail: (error: any) => {
                    if (REQUEST_FAIL)
                        REQUEST_FAIL!(error.data)
                    reject(error.data)
                }
            })
    })
}