import axios from 'axios'
interface params {
    rootUrl: string,
    timeout?: number,
    headers?: object,
    prefix?: string,
    apiList: any
}

export class SORT_API {
    private _axios: any
    private _apiList: Array<any>
    constructor(params: params) {
        const { rootUrl, timeout, prefix, headers, apiList } = params
        if (!apiList)
            throw '必须声明接口数组'
        this._apiList = apiList
        this._axios = axios.create({
            headers: headers,
            timeout: timeout ?? 5000,
            baseURL: prefix ? rootUrl + '/' + prefix : rootUrl
        })
    }
    private interceptors(_axios: any) {
        _axios.interceptors.request.use((data: any) => {
            //请求前
            return data
        }, (error: any) => {
            //请求失败
            return Promise.reject(error)
        })
        _axios.interceptors.response.use((res: any) => {
            //响应状态码2XX时
            return res
        }, (error: any) => {
            //响应状态码不在2XX时
            console.log('请求失败');
            return Promise.reject(error)
        })

    }
    async request(name: string, data: any) {
        if (!name)
            throw '请填写请求路径'
        let url, method
        for (const index in this._apiList) {
            if (this._apiList[index].url === name || this._apiList[index].name === name) {
                url = this._apiList[index].url
                method = this._apiList[index].method ?? 'POST'
                break
            }
        }
        this.interceptors(this._axios)
        return await (await this._axios({ url, data, method })).data
    }
}