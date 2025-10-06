# 快速开始

本指南将帮助你快速上手使用 Strap-Trousers。

## 基本用法

### 1. 使用 StrawPlus（推荐）

StrawPlus 使用装饰器语法，让代码更加简洁优雅：

```javascript
import axios from 'axios'
import { ConnectStrawPlus, Post, Get, Res } from 'strap-trousers'

@ConnectStrawPlus({
  lib: axios,
  name: "userApi",
  rootUrl: 'http://localhost:8202/',
  headers: {
    'Token': 'your-token',
  },
})
class UserApi {
  @Post('/user/login')
  static Login(data: { username: string; password: string }) {
    return Res<{ token: string; userInfo: any }>()
  }

  @Get('/user/list')
  static List(params?: { page: number; size: number }) {
    return Res<{ total: number; list: any[] }>()
  }
}

// 使用
const login = async () => {
  const result = await UserApi.Login({
    username: 'admin',
    password: '123456'
  })
  console.log(result)
}
```

### 2. 使用 StrawApi

StrawApi 提供函数式编程方式：

```javascript
import { connectStraw } from 'strap-trousers'
import axios from 'axios'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'productApi',
    rootUrl: 'http://localhost:8202/',
    headers: {
      'Authorization': 'Bearer token'
    }
  },
  action: {
    // 函数写法
    getProductList: () => ({
      url: 'product/list',
      method: 'GET'
    }),
    
    // 对象写法（支持类型推断）
    createProduct: {
      url: 'product/create',
      method: 'POST',
      fn() {
        return {} as {
          id: number
          name: string
          price: number
        }
      }
    }
  }
})

// 使用
const getProducts = async () => {
  const result = await api.getProductList()
  console.log(result)
}
```

### 3. 使用工具函数

Strap-Trousers 提供了丰富的工具函数：

```javascript
import { 
  DKID,           // ID生成
  splitTime,      // 时间处理
  deepClone,      // 深拷贝
  encryption,     // 加密
  decrypt,        // 解密
  splitArray,     // 数组分割
  arrayFoldFront  // 数组折叠
} from 'strap-trousers'

// 生成随机ID
const id = DKID({ length: 12, hasUppercase: true })
console.log(id) // 输出类似: aB3xK9mP2qR7

// 时间差计算
const timeDiff = splitTime({ 
  time: '2024-12-31 23:59:59',
  fillWithZeros: true 
})
console.log(timeDiff) // { day: '01', hour: '23', minute: '59', second: '59' }

// 数组分割
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const result = splitArray(arr, 3)
console.log(result) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## 高级配置

### 配置拦截器

```javascript
@ConnectStrawPlus({
  lib: axios,
  name: "api",
  rootUrl: 'http://localhost:8202/',
  interceptors: {
    // 请求成功
    success: (data) => {
      console.log('请求成功:', data)
    },
    // 请求失败
    fail: (error) => {
      console.log('请求失败:', error)
    },
    // 请求前
    beforeRequest: (config) => {
      console.log('请求前:', config)
    }
  }
})
```

### 小程序环境

```javascript
// 微信小程序
@ConnectStrawPlus({
  lib: { Axios: wx.request },
  name: "miniApi",
  rootUrl: 'https://api.example.com',
  miniAdapter: wx.request
})

// uni-app
@ConnectStrawPlus({
  lib: { Axios: uni.request },
  name: "uniApi", 
  rootUrl: 'https://api.example.com',
  miniAdapter: uni.request
})
```

## 最佳实践

1. **模块化组织**: 按业务模块组织 API，如 UserApi、ProductApi
2. **类型定义**: 使用 TypeScript 获得更好的类型提示
3. **错误处理**: 配置拦截器统一处理错误
4. **环境配置**: 使用环境变量管理不同环境的 API 地址

## 下一步

- [StrawPlus 详细文档](/guide/straw-plus) - 深入了解装饰器用法
- [StrawApi 详细文档](/guide/straw-api) - 深入了解函数式用法
- [工具函数文档](/guide/utils/) - 了解所有可用的工具函数