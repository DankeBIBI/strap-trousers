"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strawApi_1 = require("./core/strawApi");
// import fetch from 'node-fetch'
exports.default = {};
const api = (0, strawApi_1.connectStraw)({
    config: {
        name: "test",
        rootUrl: 'http://127.0.0.1:8202/',
        interceptors: {
            success: (e) => {
                console.log(e);
            }
        }
    },
    action: {
        go: () => ({
            url: 'user/list',
            method: "GET"
        })
    }
});
const run = async () => {
    try {
        console.log(await api.go());
    }
    catch (e) {
        console.error(e);
    }
    // console.log(await api.go());
};
const fetchTest = async () => {
    // console.log(fetch());
    const res = await fetch('http://127.0.0.1:8202/user/list');
    console.log(await res.json());
};
{
    run();
    // fetchTest()
}
// type GetCreateConnectDto<T> = {
// }
// type GetCreateConnectItemDto<T> = {}
// type GetCreateConnectDto<T extends apiList[]> = {
//     [K in T as T[K]]: {}
// };
// let apiListL = [
//     {
//         fn: "test",
//         list: [
//             {
//                 name: "test",
//                 url: "project/P_0nT1HiVW8w87U2tKa0",
//                 method: "GET",
//             },
//         ],
//     },
//     {
//         fn: "test",
//         list: [
//             {
//                 name: "test",
//                 url: "project/P_0nT1HiVW8w87U2tKa0",
//                 method: "GET",
//             },
//         ],
//     },
// ] as apiList[]
// const api: GetCreateConnectDto<typeof apiListL> = new createConnect({
//     rootUrl: "http://localhost:8202/",
//     apiList: apiListL,
//     injectSubMethods: false,
// })
// 我通过 GetCreateConnectDto   apiListL 中的 apiList 中的 fn 可以吗？可以的话怎么写
// const run = () => {
//     let data = decrypt('DDDKERRDKEeeDKERRDKEddDKE174168DKEffDKEssDKE304794DKEvvDKEddDKEccDKEHHDKECCDKEccDKEUUDKEYYDKEBBDKExxDKErrDKEiiDKEAADKEuuDKE217710DKEVVDKEhhDKEqqDKEggDKEvvDKEKKDKE59DKE738')
//     console.log(data);
//     const arr: { key: string }[] = [
//         { key: "value1" },
//         { key: "value2" },
//         { key: "value3" },
//     ];
//     for (const key in arr) {
//         const value = arr[key];
//         const firstKey = [K in value as K[0]];
//         console.log(firstKey); // 输出 "value1"、"value2"、"value3"
//     }
// }
// run()
// type InputOptionsDto<T> = {
//     [k in keyof T]: (...args: any) => ({
//         url: string
//     })
// }
// type OutputOptionsDto<T> = {
//     [k in keyof T]: (...args: Parameters<T[k]>) => ({
//         code: 0 | 1,
//         data: any,
//         msg: string
//     })
// }
// function run<T extends InputOptionsDto<T>>(options: {
//     name: `${string}ApiCreater`,
//     list: T
// }): OutputOptionsDto<T> {
//     return [] as any
// }
// const test = run({
//     name: 'NewApiCreater',
//     list: {
//         /**我是靓仔 */
//         getList: (data: {
//             /**这里的参数我需要在test 中提示 */
//             a: number
//             b: string
//         }) => ({
//             /**这里的参数我只要在run传参时传递 */
//             url: '/api/getList',
//         })
//     }
// })
// const a = test.getList({ a: 123, b: '' })
// export interface apiList {
//     /**分类名字 */
//     fn: string | number,
//     /**列表 */
//     list: {
//         /**接口名称 */
//         name: string | number
//         /**接口地址 */
//         url: string | number,
//         /**请求方法 */
//         method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
//         /**备注 */
//         mark?: string | number
//     }[]
// }
// const options1 = [
//     {
//         fn: "one",
//         list: [
//             {
//                 name: "test",
//                 url: "project/P_0nT1HiVW8w87U2tKa0",
//                 method: "GET",
//             },
//         ],
//     },
//     {
//         fn: "two",
//         list: [
//             {
//                 name: "test1",
//                 url: "project/P_0nT1HiVW8w87U2tKa0",
//                 method: "GET",
//             },
//         ],
//     },
// ] as apiList[]
// type GetApiList<T> = {
// }
// const makeOptionsObject = <T extends apiList>(options: T[]): GetApiList<T> => {
//     return options as any
// };
// const optionObject = makeOptionsObject(options1);
// // 这个 GetApiList 泛型我应该怎么写才能得到下面的内容
// optionObject.one.test()
// optionObject.two.test1()
// {
//     [O in T as O["fn"]]: {
//         /** 这里报错类型“"name"”无法用于索引类型“O["list"][P]”  */
//         // [P in keyof O["list"]as O["list"][P]["name"]]: (data: {
//         //     method: O['list'][P]['method'],
//         // }) => {}
//         [P in keyof O["list"]as O["list"][P]["name"]]: (data: {}) => void
//     }
// }
