import axios from 'axios'
interface apiList {
    fn?: string | number,
    list: Array<{
        name: string | number
        url: string | number,
        method: string
    }>
}
interface DATA {
    rootUrl: string,
    timeout?: number,
    headers?: object,
    apiList: Array<apiList>,
    interceptors?: {
        success?: Function,
        fail?: Function,
        beforeRequest?: Function,
        requestFail?: Function
    },
    params?: Object,
    adapter?: Function,
    data?: Object
}
export class createConnect {
    private _axios: any
    private _rootUrl: string
    private _headers?: Object
    private _timeout?: number
    private _params?: Object
    private _data?: Object
    private _apiList: Array<apiList>
    private _success?: Function
    private _fail?: Function
    private _beforeRequest?: Function
    private _requestFail?: Function
    private _adapter?: Function
    constructor(DATA: DATA) {
        const { rootUrl, timeout, headers, apiList, interceptors, params, adapter, data } = DATA
        this._adapter = adapter ?? undefined
        this._rootUrl = rootUrl
        this._headers = headers
        this._timeout = timeout
        this._params = params
        this._data = data
        this.sortFunction(apiList)
        if (interceptors) {
            const { success, fail, beforeRequest, requestFail } = interceptors
            const list = [success, fail, beforeRequest, requestFail]
            for (const item of list) {
                if (item && typeof item != 'function') throw `${item}必须为一个函数!`
            }
            this._success = success ?? undefined
            this._fail = fail ?? undefined
            this._beforeRequest = beforeRequest ?? undefined
            this._requestFail = requestFail ?? undefined
        }
        if (!apiList) throw '必须声明接口数组'
        this._apiList = apiList
        this._axios = axios.create({
            headers: headers,
            timeout: timeout ?? 5000,
            baseURL: rootUrl,
            ...params
        })
    }
    private interceptors(_axios: any) {
        _axios.interceptors.request.use((data: any) => {//请求前
            if (this._beforeRequest)
                this._beforeRequest!(data)
            return data
        }, (error: any) => { //请求失败
            if (this._requestFail)
                this._requestFail!(error)
            return Promise.reject(error)
        })
        _axios.interceptors.response.use((res: any) => {//响应状态码2XX时
            if (this._success)
                this._success!(res.data)
            return res
        }, (error: any) => { //响应状态码不在2XX时
            if (this._fail)
                this._fail!(error.data)
            return Promise.reject(error)
        })
    }
    private sortFunction(apiList: Array<apiList>) {
        const _this = this
        let list: any = {}
        for (const index in apiList) {
            list[`${apiList[index].fn}`] = (_name: string, _data: any) => {
                const _index: any = index
                if (!_name) throw '请填写请求路径'
                let _url, _method, __apiList = apiList[_index].list
                const start = new Date().getTime()
                for (const __index in __apiList) {
                    if (__apiList[__index].url === _name || __apiList[__index].name === _name) {
                        _url = __apiList[__index].url
                        _method = __apiList[__index].method ?? "POST"
                        console.log(`接口长度为${__apiList.length}，目标位于第${__index}项，查找耗时${new Date().getTime() - start}ms`);
                        break
                    }
                }
                if (!_url) throw '该路径不存在，请检查apiList配置项'
                if (this._adapter) {
                    const _adapter = this._adapter
                    const url = this._rootUrl + '/' + _url
                    const method = _method
                    const header = this._headers
                    const timeout = this._timeout
                    const __data = this._data
                    if (_this._beforeRequest)
                        _this._beforeRequest(_data)
                    return new Promise<void>((resolve, reject) => {
                        const data = {
                            ..._data,
                            ...__data
                        }
                        _adapter({
                            url, header, data, method, timeout,..._this._params,
                            success: (res: any) => {
                                if (res.statusCode == 200) {
                                    if (_this._success)
                                        _this._success!(res.data)
                                    resolve(res.data)
                                } else {
                                    if (_this._fail)
                                        _this._fail!(res.data)
                                    reject(res.data)
                                }
                            },
                            fail: (error: any) => {
                                if (_this._requestFail)
                                    _this._requestFail!(error.data)
                                reject(error.data)
                            }
                        })
                    })
                } else {
                    const __data = this._data
                    const data = {
                        ..._data,
                        ...__data
                    }
                    this.interceptors(this._axios)
                    return this.getData(_url, data, _method)
                }
            }
        }
        Object.assign(this, list)
    }
    private async getData(url: string | Number, data: any, method?: string) {
        if (!method)
            method = 'POST'
        return await (await this._axios({ url, data, method })).data
    }
}