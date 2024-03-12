import { DKID, createConnect } from './index'
import { connectStraw } from './src'
const list: any = new Array(100000).fill({
    name: 'haha',
    url: '123',
    method: 'POST'
})
list.push({
    name: 'ddcc',
    url: 'getUserInfo',
    method: 'GET'
})
const success = (res: any) => {
    // res.code = 1000
    // console.log("🚀请求成功", res)
}
const fail = (res: any) => {
    // res.code = 1000
    // console.log("🚀请求失败", res)
}
const beforeRequest = (data: any) => {
    console.log("🚀这是打印的数据哦 ~ data:", data)
    // console.log("🚀请求前", data)
}
const requestFail = (data: any) => {
    // console.log("🚀请求失败", data)
}
export {
    list,
    success,
    fail,
    beforeRequest,
    requestFail
}

console.log(DKID({
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
}
const cc = () => {
    console.log(123);
}
// Object.assign(FSAPI.prototype,{
//     cc(){console.log(123);}
// })
const api: any = new createConnect(data)

// // console.log("🚀这是打印的数据哦 ~ api:", )
const test = async () => {
    try {
        const res = await api.test1('用户发布的文章')
        console.log("🚀这是打印的数据哦 ~ res:", res)
    } catch (e) { console.error(e); }
}
test()


const api_ = connectStraw({
    config: {
        name: '12312',
        rootUrl: '12321',
    },
    action: {
        go: (k?: {
            data: Object
            value: string
        }) => ({
            url: "12312",
            method: 'POST'
        }),
        ts: {
            url: '',
            method: 'POST',
            fn: () => { } 
        }
    }
})
const a = api_.ts()
const aa = {
    url: '',
    method: '',
    /** */
    fn: () => { }
}