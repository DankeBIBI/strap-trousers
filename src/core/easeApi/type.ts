export interface createOptions {
     /**请求库 | uni.request | wx.request | axios */
    lib: any,
    /**域名 */
    rootUrl: string,
    /**控制请求超时时间 */
    timeout?: number,
    /**请求headers */
    headers?: object,
    /**组合的请求数组 */
    apiList: Array<apiList>,
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
    params?: params & object & any,
    /**@description 当是小程序使用时，必须传递miniAdapter 为小程序框架的请求方法
     * @description 目前适配了 微信与uniapp
     * @example 
     * miniAdapter:wx.request
     * 或者
     * miniAdapter:uni.request
     */
    miniAdapter?: Function,
    data?: Object,
    showLog?: boolean,
    injectSubMethods?: boolean
    defaultMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    /**注入成功状态码 考虑到某些框架成功返回 201，可以添加某个特定状态码也作为请求成功识别*/
    injectStateCode?: number
}

/**接口 */
export interface apiList {
    /**分类名字 */
    readonly fn: string | number,
    /**列表 */
    readonly list: readonly {
        /**接口名称 */
        readonly name: string | number
        /**接口地址 */
        readonly url: string | number,
        /**请求方法 */
        readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
        /**备注 */
        readonly mark?: string | number
    }[]
}
export type params = {
    /**  
     *  `transformRequest` 允许在向服务器发送前，修改请求数据
     *  它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
     *  数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
     *  你可以修改请求头。
    */
    transformRequest?: [(data: any, headers: any) => any],
    /**
     * `paramsSerializer`是可选方法，主要用于序列化`params`
     * @example
     *   paramsSerializer: function (params) {
     *      return Qs.stringify(params, {arrayFormat: 'brackets'})
     *  },
     * @returns 
     */
    // paramsSerializer?: ParamsSerializerOptions
}
