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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestFail = exports.beforeRequest = exports.fail = exports.success = exports.list = void 0;
const index_1 = require("./index");
const list = new Array(100000).fill({
    name: 'haha',
    url: '123',
    method: 'POST'
});
exports.list = list;
list.push({
    name: 'ddcc',
    url: 'getUserInfo',
    method: 'GET'
});
const success = (res) => {
    // res.code = 1000
    // console.log("🚀请求成功", res)
};
exports.success = success;
const fail = (res) => {
    // res.code = 1000
    // console.log("🚀请求失败", res)
};
exports.fail = fail;
const beforeRequest = (data) => {
    console.log("🚀这是打印的数据哦 ~ data:", data);
    // console.log("🚀请求前", data)
};
exports.beforeRequest = beforeRequest;
const requestFail = (data) => {
    // console.log("🚀请求失败", data)
};
exports.requestFail = requestFail;
console.log((0, index_1.DKID)({
    length: 60,
    hasSymbol: false,
    prefix: 'DKAPI_',
    includePrefixAndSuffix: false
}));
const data = {
    rootUrl: 'https://api.dankebibi.cc/api',
    headers: {
        pd_key: 'RRDKEYYDKERRDKEYYDKEVVDKEPPDKEMMDKEZZDKEWWDKE_DKEMMDKERRDKENNDKEWWDKEZZDKE_DKEIIDKEVVDKEEEDKEIIDKEVVDKEHHDKE-DKEWWDKEKKDKE171DKE6'
    },
    timeout: 5000,
    interceptors: {
        success,
        fail,
        beforeRequest,
        requestFail,
    },
    params: {
        haha: '12312',
        yahu: 1231312
    },
    data: {
        author: 82022094
    },
    apiList: [
        {
            fn: 'test1',
            list: [
                {
                    name: '123',
                    url: 'T_9LJt2r9W0Ht8823VMX',
                    method: 'GET'
                },
                {
                    name: '用户发布的文章',
                    url: 'B_sTdI21yQfR3Uw5Q7M4',
                    method: 'POST'
                },
            ]
        }
    ],
};
const cc = () => {
    console.log(123);
};
// Object.assign(FSAPI.prototype,{
//     cc(){console.log(123);}
// })
const api = new index_1.createConnect(data);
// // console.log("🚀这是打印的数据哦 ~ api:", )
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield api.test1('用户发布的文章');
        console.log("🚀这是打印的数据哦 ~ res:", res);
    }
    catch (e) {
        console.error(e);
    }
});
test();
