import axios from 'axios'
import { ConnectStrawPlus, Post, Res } from '../src'
// const _api = connectStraw({
//   config: {
//     lib: axios,
//     name: 'test',
//     rootUrl: 'https://api.dankebibi.cn',
//     headers: {
//       Token: '12312312333333333333333333333333333333333333333333klkl',
//     },
//     responseData: {} as {
//       data: string
//     },
//   },
//   action: ({ POST, GET }) => ({
//     /**测试 1*/
//     test: () => {
//       const signal = new AbortSignal()
//       return GET({
//         url: '/user/list',
//         headers: {
//           'T-Token': 'asdasd',
//         },
//         signal: signal,
//       })
//     },
//     /**测试 2*/
//     go(e: { [key: string]: any }): Promise<{
//       data: string
//     }> {
//       return POST({
//         url: '/user/login',
//         data: e,
//         headers: {
//           'T-Token': 'asdasd',
//         },
//         debounce: true,
//       })
//     },
//   }),
// })
@ConnectStrawPlus({
  lib: axios,
  name: 'test',
  //   rootUrl: 'https://api.dankebibi.cn',
  rootUrl: 'http://localhost:8202/',
  headers: {
    Token: '12312312333333333333333333333333333333333333333333klkl',
    appid: 1,
  },
  responseData: {} as {
    data: string
  },
})
export class Test {
  //   @Debounce()
  @Post('/user/login')
  static Login(_e: { password: string; user: string; [key: string]: any }) {
    return Res<{
      data: any
    }>()
  }
}
async function main() {
  // const res = await api.test()
  // const res = Test.Login({
  //     password: '123456',
  //     user: "13425278202",
  //     appid: "1"
  // })
  const res1 = await Test.Login({
    password: '123456',
    user: '13425278202',
    appid: '1',
  })
  console.log('🚀 -- 》》 ~ res1:', res1)
}
main()
