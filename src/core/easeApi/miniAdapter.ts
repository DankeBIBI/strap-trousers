/**小程序适配请求 */
export async function miniAdapterRequest(
  instance: any,
  url: string | number,
  data: any,
  method?: string
) {
  method = method ?? instance.DEFAULT_METHOD
  const header = instance.HEADERS
  const timeout = instance.TIME_OUT
  // 修复：避免双斜杠
  const base = `${instance.ROOT_URL}`.replace(/\/$/, '')
  const resolvedUrl = `${url}`.replace(/^\//, '')
  const fullUrl = base + '/' + resolvedUrl
  return new Promise<void>((resolve, reject) => {
    if (instance.MINI_ADAPTER)
      instance.MINI_ADAPTER({
        url: fullUrl, header, data, method, timeout, ...instance.PARAMS,
        success: (res: any) => {
          if (res.statusCode == 200 || res.statusCode == 201) {
            if (instance.REQUEST_SUCCESS) instance.REQUEST_SUCCESS!(res.data)
            resolve(res.data)
          } else {
            if (instance.FAIL) instance.FAIL!(res.data)
            reject(res.data)
          }
        },
        fail: (error: any) => {
          if (instance.REQUEST_FAIL) instance.REQUEST_FAIL!(error.data)
          reject(error.data)
        }
      })
  })
}
