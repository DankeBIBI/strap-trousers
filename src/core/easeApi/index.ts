import type { apiList, createOptions } from './type'
import { axiosRequest } from './axios'
import { miniAdapterRequest } from './miniAdapter'
/**分类数 */
let sortNum = 0
/**接口数 */
let apiNum = 0

export let
    LIB: any = '',
    /**请求头 */
    HEADERS: any = '',
    /**请求参数 */
    PARAMS: any = '',
    /**请求参数 */
    DATA: any = {},
    /**是否显示日志 */
    SHOW_LOG: boolean | undefined = false,
    /**最大 请求时间 */
    TIME_OUT: number | undefined = 10000,
    /**根接口 */
    ROOT_URL: string | undefined = '',

    /**请求前执行 */
    BEFORE_REQUEST: Function | undefined,
    /**请求失败 */
    REQUEST_FAIL: Function | undefined,
    /**请求返回的状态码 不在 200 或者 _injectStateCode */
    FAIL: Function | undefined,
    /**请求成功 */
    REQUEST_SUCCESS: Function | undefined,
    /**注入的成功状态码 */
    INJECT_STATE_CODE: Number,
    /**小程序适配器 */
    MINI_ADAPTER: Function | undefined,
    /**设置默认的请求方式 */
    DEFAULT_METHOD: string | undefined,
    /**是否将接口提升至一级 */
    INJECT_SUB_METHODS: Boolean | undefined


/**
 * @deprecated 建议使用 connectStraw 代替 
 * @description connectStraw拥有对TypeScript的支持，并且拥有更多的功能且易于书写
 * @description easeApi 见字明义 
 * 轻松封装接口
 * 最少只需在创建的createConnect对象中添加 rootUrl 与 apiList 即可完成封装
 * 
 * @author DANKEBIBI <1580074116@qq.com>
 * @param {string} rootUrl 请求根路径
 * @param {Array<apiList>} apiList 接口队列
 * @param {}
 */
export class createConnect {
    private apiList: Array<apiList>
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
            injectSubMethods,
            injectStateCode } = options
        LIB = lib
        MINI_ADAPTER = miniAdapter ?? undefined
        ROOT_URL = rootUrl
        HEADERS = headers
        TIME_OUT = timeout
        PARAMS = params
        DATA = data
        SHOW_LOG = showLog
        DEFAULT_METHOD = defaultMethod ?? 'POST'
        INJECT_STATE_CODE = injectStateCode ?? 201
        INJECT_SUB_METHODS = injectSubMethods ?? true
        if (!LIB) throw '请添加lib'
        this.sortFunction(apiList)
        if (interceptors) {
            let i = '' as 'success' | 'fail' | 'beforeRequest' | 'requestFail'
            for (i in interceptors) {
                if (interceptors[i] && typeof interceptors[i] != 'function') throw `${i}必须为一个函数!`
            }
            REQUEST_SUCCESS = interceptors['success'] ?? undefined
            FAIL = interceptors['fail'] ?? undefined
            BEFORE_REQUEST = interceptors['beforeRequest'] ?? undefined
            REQUEST_FAIL = interceptors['requestFail'] ?? undefined
        }
        if (!apiList) throw '必须声明接口数组'
        this.apiList = apiList
    }
    /**
     * 将分类方法化
     * @param apiList 
     */
    private sortFunction(apiSortList: Array<apiList>) {
        // const _this = this
        let list: any = {}
        for (const i in apiSortList) {
            sortNum += 1
            const apiListParams = apiSortList[i]
            let miniFunctionList: any = {}
            list[`${apiListParams.fn}`] = async (requestName: string | number, params: any) => {
                if (!requestName) throw '请填写请求路径'
                let
                    /**二级接口地址 */
                    apiUrl,
                    /**二级接口请求方法 */
                    apiMethod,
                    /**二级接口列表 */
                    apiList = apiSortList[i].list,
                    /**开始时间 */
                    start = new Date().getTime()
                for (const j in apiList) {
                    if (apiList[j].url === requestName || apiList[j].name === requestName || apiList[j].mark === requestName) {
                        apiUrl = apiList[j].url
                        apiMethod = apiList[j].method ?? "POST"
                        if (SHOW_LOG)
                            console.log(`接口长度为${apiList.length}，目标位于第${j}项，查找耗时${new Date().getTime() - start}ms`);
                        break
                    }
                }
                if (!apiUrl) throw '该路径不存在，请检查apiList配置项'
                const data = {
                    ...params,
                    ...DATA
                }
                if (MINI_ADAPTER) {
                    if (BEFORE_REQUEST)
                        BEFORE_REQUEST(params)
                    return miniAdapterRequest(apiUrl, data, apiMethod)

                } else {
                    return axiosRequest(apiUrl, data, apiMethod)
                }
            }
            for (const key in apiListParams.list) {
                apiNum += 1
                miniFunctionList[`${apiListParams.list[key].name}`] = async (params: any) => {
                    const miniFunctionListUrl = apiListParams.list[key].url
                    const miniFunctionListMethod = apiListParams.list[key].method
                    if (!miniFunctionListUrl) throw '该路径不存在，请检查apiList配置项'
                    const data = {
                        ...params,
                        ...DATA
                    }
                    if (MINI_ADAPTER) {
                        if (BEFORE_REQUEST)
                            BEFORE_REQUEST(params)
                        return miniAdapterRequest(miniFunctionListUrl, data, miniFunctionListMethod)

                    } else {
                        return axiosRequest(miniFunctionListUrl, data, miniFunctionListMethod)
                    }
                }
                Object.assign(list[`${apiListParams.fn}`], miniFunctionList)
                /**是否将接口提升至一级 */
                if (INJECT_SUB_METHODS) {
                    let secFunName = apiListParams.list[key].name
                    list[typeof list[apiListParams.list[key].name] == 'function' ?
                        `${apiListParams.fn}_${secFunName}` : secFunName]
                        = miniFunctionList[secFunName]
                }
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