import axios from "axios";
import { connectStraw } from "../src"
const api = connectStraw({
    config: {
        lib: axios,
        name: "test",
        rootUrl: 'https://api.dankebibi.cn',
        headers: {
            'Token': '12312312333333333333333333333333333333333333333333klkl'
        },
        responseData: {} as {
            data: string
        }
    },
    action: ({
        POST,
        GET,
        DELETE,
        PUT
    }) => ({
        /**测试 1*/
        test: () => {
            const signal = new AbortSignal()
            return GET({
                url: '/user/list',
                headers: {
                    'T-Token': 'asdasd'
                },
                signal:signal
            })
        },
        /**测试 2*/
        go(e: {
            name: string
        }): Promise<{
            data: string
        }> {
            return GET({
                url: '/user/list',
                data: e,
                headers: {
                    'T-Token': 'asdasd'
                },
            })
        }
    })
});
async function a() {
    try {
        const res = await api.test()
        // console.log(res, '231312');
    } catch (e) { }
}
a()


// const a = (e:{
//     fn:()=>?
// }) =>{

// }