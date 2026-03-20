import { miniAdapterRequest } from './miniAdapter'
import type { apiList, createOptions } from './type'
/**分类数 */
let sortNum = 0
/**接口数 */
let apiNum = 0

export let SHOW_LOG: boolean | undefined = false

export class createConnect {
  apiList: Array<apiList>
  /**请求库实例 */
  private _lib: any
  /**请求头 */
  HEADERS: any
  /**请求参数 */
  PARAMS: any
  /**请求参数 */
  DATA: any
  /**最大请求时间 */
  TIME_OUT: number
  /**根接口 */
  ROOT_URL: string
  /**请求前执行 */
  BEFORE_REQUEST: Function | undefined
  /**请求失败 */
  REQUEST_FAIL: Function | undefined
  /**请求返回的状态码不在200或者_injectStateCode */
  FAIL: Function | undefined
  /**请求成功 */
  REQUEST_SUCCESS: Function | undefined
  /**小程序适配器 */
  MINI_ADAPTER: Function | undefined
  /**设置默认的请求方式 */
  DEFAULT_METHOD: string
  /**axios实例缓存，避免拦截器重复注册 */
  private _axiosInstance: any = null

  constructor(options: createOptions) {
    const {
      lib,
      rootUrl,
      timeout,
      headers,
      apiList,
      interceptors,
      params,
      miniAdapter,
      data,
      showLog,
      defaultMethod,
    } = options
    if (!lib) throw '请添加lib'

    this._lib = lib
    this.ROOT_URL = rootUrl ?? ''
    this.HEADERS = headers ?? {}
    this.TIME_OUT = timeout ?? 10000
    this.PARAMS = params ?? {}
    this.DATA = data ?? {}
    this.DEFAULT_METHOD = defaultMethod ?? 'POST'
    SHOW_LOG = showLog ?? false
    this.MINI_ADAPTER = miniAdapter ?? undefined

    if (interceptors) {
      let i = '' as 'success' | 'fail' | 'beforeRequest' | 'requestFail'
      for (i in interceptors) {
        if (interceptors[i] && typeof interceptors[i] != 'function') throw `${i}必须为一个函数!`
      }
      this.REQUEST_SUCCESS = interceptors['success'] ?? undefined
      this.FAIL = interceptors['fail'] ?? undefined
      this.BEFORE_REQUEST = interceptors['beforeRequest'] ?? undefined
      this.REQUEST_FAIL = interceptors['requestFail'] ?? undefined
    }

    if (!apiList) throw '必须声明接口数组'
    this.apiList = apiList

    this.sortFunction(apiList)
  }

  /**获取axios实例（拦截器仅注册一次） */
  async getAxiosInstance() {
    if (this._axiosInstance) return this._axiosInstance
    // 动态执行headers和params中的函数，存入临时变量避免污染实例属性
    const headers: any = {}
    for (const i in this.HEADERS) {
      headers[i] = typeof this.HEADERS[i] == 'function'
        ? await this.HEADERS[i]()
        : this.HEADERS[i]
      if (SHOW_LOG) console.log(`执行了 ${i} 方法,结果为 ${headers[i]}`)
    }
    const params: any = {}
    for (const i in this.PARAMS) {
      params[i] = typeof this.PARAMS[i] == 'function'
        ? await this.PARAMS[i]()
        : this.PARAMS[i]
      if (SHOW_LOG) console.log(`执行了 ${i} 方法,结果为 ${params[i]}`)
    }
    const instance = this._lib.create({
      headers,
      timeout: this.TIME_OUT,
      baseURL: this.ROOT_URL,
      ...params,
    })
    // 拦截器只注册一次
    instance.interceptors.request.use(
      (data: any) => {
        if (this.BEFORE_REQUEST) this.BEFORE_REQUEST!(data)
        return data
      },
      (error: any) => {
        if (this.REQUEST_FAIL) this.REQUEST_FAIL!(error)
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      (res: any) => {
        if (this.REQUEST_SUCCESS) this.REQUEST_SUCCESS!(res.data)
        return res
      },
      (error: any) => {
        if (this.FAIL) this.FAIL!(error.data)
        return Promise.reject(error)
      }
    )
    this._axiosInstance = instance
    return instance
  }

  private async axiosRequest(url: string | number, data: any, method: string | undefined = this.DEFAULT_METHOD) {
    const axios = await this.getAxiosInstance()
    let params: IAxiosRequestDto = { url, method }
    params[method == 'GET' ? 'params' : 'data'] = data
    return (await axios(params)).data
  }

  /**
   * 将分类方法化
   * @param apiList
   */
  private sortFunction(apiSortList: Array<apiList>) {
    let list: any = {}
    for (const i in apiSortList) {
      sortNum += 1
      const apiListParams = apiSortList[i]
      let miniFunctionList: any = {}
      list[`${apiListParams.fn}`] = async (requestName: string | number, params: any) => {
        if (!requestName) throw '请填写请求路径'
        let apiUrl = '',
          apiMethod: string = 'POST',
          apiList = apiSortList[i].list,
          start = new Date().getTime()
        for (const j in apiList) {
          if (
            apiList[j].url === requestName ||
            apiList[j].name === requestName ||
            apiList[j].mark === requestName
          ) {
            apiUrl = apiList[j].url as string
            apiMethod = apiList[j].method ?? 'POST'
            if (SHOW_LOG)
              console.log(
                `接口长度为${apiList.length}，目标位于第${j}项，查找耗时${new Date().getTime() - start}ms`
              )
            break
          }
        }
        if (!apiUrl) throw '该路径不存在，请检查apiList配置项'
        const data = {
          ...params,
          ...this.DATA,
        }
        if (this.MINI_ADAPTER) {
          if (this.BEFORE_REQUEST) this.BEFORE_REQUEST(params)
          return miniAdapterRequest(this, apiUrl, data, apiMethod)
        } else {
          return this.axiosRequest(apiUrl, data, apiMethod)
        }
      }
      for (const key in apiListParams.list) {
        apiNum += 1
        const item = apiListParams.list[key]
        const secFunName = item.name
        miniFunctionList[secFunName] = async (params: any) => {
          if (!item.url) throw '该路径不存在，请检查apiList配置项'
          const data = {
            ...params,
            ...this.DATA,
          }
          if (this.MINI_ADAPTER) {
            if (this.BEFORE_REQUEST) this.BEFORE_REQUEST(params)
            return miniAdapterRequest(this, item.url, data, item.method)
          } else {
            return this.axiosRequest(item.url, data, item.method)
          }
        }
        Object.assign(list[`${apiListParams.fn}`], miniFunctionList)
      }
    }
    Object.assign(this, list)
  }

  static getRouterNums() {
    return apiNum
  }
  static getRouterSortNums() {
    return sortNum
  }
}
