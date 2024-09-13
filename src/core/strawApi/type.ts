/**
 * @description  生成straw格式化过后的配置
 */
export type createActionCallbackDto<T, K, C> = {
    [N in keyof T]: T[N] extends requestConfigTypeOfObject ?
    /* 当继承于 requestConfigTypeOfObject时 */
    T[N][keyof T[N]] extends (...params: infer Params) => any ? string : T[N]['fn']
    :
    (
        T[N] extends (...params: infer Params) => any ?
        (
            (...params: Params) => K extends Object | string | number ?
                K
                :
                any
        )
        :
        any
    )
} & strawInstance<C>

/**
 * @description  生成straw格式化过后的配置
 */
export type createActionInsertDto<T> = {
    [K in keyof T]: T[K] extends Function ?
    (...params: any) => (requestConfig)
    :
    requestConfigTypeOfObject
}
export type requestConfig = {
    /**地址路径 */
    url: string,
    /**请求方法 */
    method: 'get' | 'post' | 'put' | 'delete' | 'GET' | 'POST' | 'PUT' | "DELETE",
    /**开启防抖 */
    debounce?: boolean,
}
export type requestConfigTypeOfObject = requestConfig & {
    fn: (...params: any) => any
}

export type strawInstance<C> = {
    /**实例 */
    __Straw: Map<any, string>,
    /**请求缓存池 */
    __ApiPool: Map<any, string>,
    __Config: C
}
/**请求体类型 */
export type requestBodyDto = {
    /**axios */
    Axios?: any
}
export interface createOptions {
    /**请求库 | uni.request | wx.request | axios */
    lib: any,
    /**创建连接的唯一id */
    name: string,
    /**域名 */
    rootUrl: string,
    /**控制请求超时时间 */
    timeout?: number,
    /**请求headers */
    headers?: object & any,
    /**拦截器 */
    interceptors?: {
        /**成功触发  后端返回的状态码在 200 和 injectStateCode 时触发*/
        success?: Function,
        /**失败触发  后端返回的状态码不在2XX范围内时触发*/
        fail?: Function,
        /**发起网络请求时触发 */
        beforeRequest?: Function,
        /**请求失败时触发 */
        requestFail?: Function
    },
    /**这些是创建请求时可以用的配置选项。
     * 如果使用 Axios ->
     * @link https://www.axios-http.cn/docs/req_config
     */
    params?: object & any,
    /**@description 当是小程序使用时，必须传递miniAdapter 为小程序框架的请求方法
     * @description 目前适配了 微信与uniapp
     * @example 
     * miniAdapter:wx.request
     * 或者
     * miniAdapter:uni.request
     */
    miniAdapter?: Function,
    /**在每次请求中（无论请求方法）额外的值 */
    data?: Object,
    showLog?: boolean,
    injectSubMethods?: boolean
    defaultMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    /**注入成功状态码 考虑到某些框架成功返回 201，可以添加某个特定状态码也作为请求成功识别*/
    injectStateCode?: number,
    responseData?: any
}


export type StrawCallback = {
    POST: Function,
    GET: Function,
    PUT: Function,
    DELETE: Function
}