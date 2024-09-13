import axios from "axios";
import { connectStraw } from "../src"
const api = connectStraw({
    config: {
        lib: axios,
        name: "test",
        rootUrl: 'https://api.dankebibi.cn',
        headers: {
            'Token': () => {
                return new Date().getTime()
            }
        },
        responseData: {} as {
            data: string
        }
    },
    action: ({
        POST,
        GET
    }) => ({
        /**测试 */
        go(): Promise<{
            data: string
        }> {
            return GET({
                url: '/'
            })
        }
    })
    // action: {
    //     /**测试 */
    //     go: () => ({
    //         url: '',
    //         method: 'GET',
    //         debounce: true
    //     }),
    //     //对象写法
    //     list2: {
    //         url: 'user/list',
    //         debounce: true,
    //         method: "GET",
    //         //Typescript工程下 api.object会继承fn()的出入参类型
    //         fn() {
    //             return {} as {
    //                 data: string
    //                 value: string
    //             }
    //         }
    //     }
    // }
});
async function a() {
    try {
        const res = await api.__Straw
        console.log(res, '231312');
    } catch (e) { console.error(e); }
}
a()


// const a = (e:{
//     fn:()=>?
// }) =>{

// }