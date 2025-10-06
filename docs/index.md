---
layout: home

hero:
  name: "Strap-Trousers"
  text: "轻松封装接口的JavaScript库"
  tagline: 简化API请求封装，提供丰富的工具函数
  image:
    src: https://pd-base.oss-cn-heyuan.aliyuncs.com/strap-trousers.png
    alt: Strap-Trousers
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看文档
      link: /guide/

features:
  - icon: 🚀
    title: 简单易用
    details: 最少只需配置rootUrl和apiList即可完成接口封装，大大简化开发流程
  - icon: 🎯
    title: TypeScript支持
    details: 完整的TypeScript类型定义，提供更好的开发体验和代码提示
  - icon: 🔧
    title: 丰富的工具函数
    details: 提供数据处理、数组操作、对象操作、时间处理等常用工具函数
  - icon: ⚡
    title: 高性能
    details: 优化的请求处理逻辑，支持防抖、缓存等功能
  - icon: 📱
    title: 小程序支持
    details: 内置小程序适配器，支持微信、uni-app等小程序框架
  - icon: 🎨
    title: 装饰器支持
    details: 使用装饰器语法，让代码更加简洁优雅
---

## 快速预览

```javascript
// 使用 StrawPlus 装饰器
@ConnectStrawPlus({
  lib: axios,
  name: "test",
  rootUrl: 'http://localhost:8202/',
  headers: {
    Token: 'your-token',
  },
})
class Test {
  @Post('/user/login')
  static Login(data: LoginParams) {
    return Res<LoginResponse>()
  }
}

// 使用 StrawApi
const api = connectStraw({
  config: {
    lib: axios,
    name: 'api1',
    rootUrl: 'localhost:8202/',
  },
  action: {
    getList: () => ({
      url: 'example/list',
      method: 'GET'
    })
  }
})
```