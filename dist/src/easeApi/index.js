"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnect = void 0;
const axios_1 = __importDefault(require("axios"));
class createConnect {
    constructor(DATA) {
        const { rootUrl, timeout, headers, apiList, interceptors, params, adapter, data } = DATA;
        this._adapter = adapter !== null && adapter !== void 0 ? adapter : undefined;
        this._rootUrl = rootUrl;
        this._headers = headers;
        this._timeout = timeout;
        this._params = params;
        this._data = data;
        this.sortFunction(apiList);
        if (interceptors) {
            const { success, fail, beforeRequest, requestFail } = interceptors;
            const list = [success, fail, beforeRequest, requestFail];
            for (const item of list) {
                if (item && typeof item != 'function')
                    throw `${item}必须为一个函数!`;
            }
            this._success = success !== null && success !== void 0 ? success : undefined;
            this._fail = fail !== null && fail !== void 0 ? fail : undefined;
            this._beforeRequest = beforeRequest !== null && beforeRequest !== void 0 ? beforeRequest : undefined;
            this._requestFail = requestFail !== null && requestFail !== void 0 ? requestFail : undefined;
        }
        if (!apiList)
            throw '必须声明接口数组';
        this._apiList = apiList;
        this._axios = axios_1.default.create(Object.assign({ headers: headers, timeout: timeout !== null && timeout !== void 0 ? timeout : 5000, baseURL: rootUrl }, params));
    }
    interceptors(_axios) {
        _axios.interceptors.request.use((data) => {
            if (this._beforeRequest)
                this._beforeRequest(data);
            return data;
        }, (error) => {
            if (this._requestFail)
                this._requestFail(error);
            return Promise.reject(error);
        });
        _axios.interceptors.response.use((res) => {
            if (this._success)
                this._success(res.data);
            return res;
        }, (error) => {
            if (this._fail)
                this._fail(error.data);
            return Promise.reject(error);
        });
    }
    sortFunction(apiList) {
        const _this = this;
        let list = {};
        for (const index in apiList) {
            list[`${apiList[index].fn}`] = (_name, _data) => {
                var _a;
                const _index = index;
                if (!_name)
                    throw '请填写请求路径';
                let _url, _method, __apiList = apiList[_index].list;
                const start = new Date().getTime();
                for (const __index in __apiList) {
                    if (__apiList[__index].url === _name || __apiList[__index].name === _name) {
                        _url = __apiList[__index].url;
                        _method = (_a = __apiList[__index].method) !== null && _a !== void 0 ? _a : "POST";
                        console.log(`接口长度为${__apiList.length}，目标位于第${__index}项，查找耗时${new Date().getTime() - start}ms`);
                        break;
                    }
                }
                if (!_url)
                    throw '该路径不存在，请检查apiList配置项';
                if (this._adapter) {
                    const _adapter = this._adapter;
                    const url = this._rootUrl + '/' + _url;
                    const method = _method;
                    const header = this._headers;
                    const timeout = this._timeout;
                    const __data = this._data;
                    if (_this._beforeRequest)
                        _this._beforeRequest(_data);
                    return new Promise((resolve, reject) => {
                        const data = Object.assign(Object.assign({}, _data), __data);
                        _adapter(Object.assign(Object.assign({ url, header, data, method, timeout }, _this._params), { success: (res) => {
                                if (res.statusCode == 200) {
                                    if (_this._success)
                                        _this._success(res.data);
                                    resolve(res.data);
                                }
                                else {
                                    if (_this._fail)
                                        _this._fail(res.data);
                                    reject(res.data);
                                }
                            }, fail: (error) => {
                                if (_this._requestFail)
                                    _this._requestFail(error.data);
                                reject(error.data);
                            } }));
                    });
                }
                else {
                    const __data = this._data;
                    const data = Object.assign(Object.assign({}, _data), __data);
                    this.interceptors(this._axios);
                    return this.getData(_url, data, _method);
                }
            };
        }
        Object.assign(this, list);
    }
    getData(url, data, method) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!method)
                method = 'POST';
            return yield (yield this._axios({ url, data, method })).data;
        });
    }
}
exports.createConnect = createConnect;
