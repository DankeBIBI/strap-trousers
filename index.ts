import { DKID } from './src/dk-id'
import { SORT_API } from './src/sort-api'
export {
    DKID
}
console.log(DKID());
const data = {
    rootUrl: 'http://127.0.0.1:8202',
    headers: {
    },
    timeout: 5000,
    prefix:'api',
    apiList: [
        {
            name: '123',
            url: 'getUserInfo',
            method: 'GET'
        },
        {
            name: '获取文章',
            url: 'userBlog',
            method: 'POST'
        }
    ]
}
const api = new SORT_API({ ...data })
const test = async () => {
    try {
        const res = await api.request('123', { author: 82022094 })
        console.log("🚀这是打印的数据哦 ~ res:", res)
    } catch (e) { console.error(e); }
}
test()
