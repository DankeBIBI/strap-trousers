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
exports.SORT_API = void 0;
const axios_1 = __importDefault(require("axios"));
class SORT_API {
    constructor(params) {
        const { rootUrl, timeout, prefix, headers, apiList } = params;
        if (!apiList)
            throw '必须声明接口数组';
        this._apiList = apiList;
        this._axios = axios_1.default.create({
            headers: headers,
            timeout: timeout !== null && timeout !== void 0 ? timeout : 5000,
            baseURL: prefix ? rootUrl + '/' + prefix : rootUrl
        });
    }
    interceptors(_axios) {
        _axios.interceptors.request.use((data) => {
            //请求前
            return data;
        }, (error) => {
            //请求失败
            return Promise.reject(error);
        });
        _axios.interceptors.response.use((res) => {
            //响应状态码2XX时
            return res;
        }, (error) => {
            //响应状态码不在2XX时
            console.log('请求失败');
            return Promise.reject(error);
        });
    }
    request(name, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!name)
                throw '请填写请求路径';
            let url, method;
            for (const index in this._apiList) {
                if (this._apiList[index].url === name || this._apiList[index].name === name) {
                    url = this._apiList[index].url;
                    method = (_a = this._apiList[index].method) !== null && _a !== void 0 ? _a : 'POST';
                    break;
                }
            }
            this.interceptors(this._axios);
            return yield (yield this._axios({ url, data, method })).data;
        });
    }
}
exports.SORT_API = SORT_API;
