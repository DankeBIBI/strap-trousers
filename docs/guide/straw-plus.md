# StrawPlus

StrawPlus 使用装饰器语法，让 API 封装更加简洁优雅。

## 基本用法

### 创建 API 类

```javascript
import axios from 'axios'
import { ConnectStrawPlus, Post, Get, Put, Delete, Res } from 'strap-trousers'

@ConnectStrawPlus({
  lib: axios,
  name: "userApi",
  rootUrl: 'http://localhost:8202/',
  headers: {
    'Content-Type': 'application/json'
  }
})
class UserApi {
  @Post('/user/login')
  static Login(data: { username: string; password: string }) {
    return Res<{ token: string; userInfo: any }>()
  }

  @Get('/user/info')
  static GetUserInfo(params: { userId: number }) {
    return Res<{ name: string; age: number }>()
  }

  @Put('/user/update')
  static UpdateUser(data: { userId: number; name: string }) {
    return Res<{ success: boolean }>()
  }

  @Delete('/user/delete')
  static DeleteUser(params: { userId: number }) {
    return Res<{ success: boolean }>()
  }
}
```

### 使用 API

```javascript
// 调用登录接口
const loginResult = await UserApi.Login({
  username: 'admin',
  password: '123456',
})

// 调用获取用户信息接口
const userInfo = await UserApi.GetUserInfo({ userId: 1 })

// 调用更新用户信息接口
const updateResult = await UserApi.UpdateUser({
  userId: 1,
  name: '新用户名',
})
```

## 高级配置

### 配置选项

```javascript
@ConnectStrawPlus({
  lib: axios,
  name: "api",
  rootUrl: 'http://localhost:8202/',
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  },
  data: {
    // 公共参数
    appId: '123456',
    version: '1.0.0'
  },
  showLog: true, // 显示日志
  injectStateCode: 201, // 注入成功状态码
  interceptors: {
    success: (data) => {
      console.log('请求成功:', data)
      return data
    },
    fail: (error) => {
      console.log('请求失败:', error)
      throw error
    },
    beforeRequest: (config) => {
      console.log('请求前:', config)
      return config
    }
  }
})
```

### 使用防抖

```javascript
class SearchApi {
  @Debounce()
  @Get('/search')
  static Search(params: { keyword: string }) {
    return Res<{ results: any[] }>()
  }
}
```

### 小程序环境

```javascript
// 微信小程序
@ConnectStrawPlus({
  lib: { Axios: wx.request },
  name: "wechatApi",
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

## 装饰器详解

### @ConnectStrawPlus

类装饰器，用于配置 API 基础信息。

```javascript
@ConnectStrawPlus({
  lib: axios,           // 请求库
  name: "apiName",      // 唯一标识
  rootUrl: 'https://api.example.com', // 根路径
  headers: {},          // 请求头
  timeout: 5000,        // 超时时间
  // ...其他配置
})
```

### 请求方法装饰器

- `@Post(url)` - POST 请求
- `@Get(url)` - GET 请求
- `@Put(url)` - PUT 请求
- `@Delete(url)` - DELETE 请求

```javascript
@Post('/user/create')
static CreateUser(data: UserData) {
  return Res<User>()
}
```

### @Debounce

防抖装饰器，防止重复请求。

```javascript
@Debounce()
@Get('/search')
static Search(keyword: string) {
  return Res<SearchResult>()
}
```

### Res

类型收集器，用于定义返回类型。

```javascript
@Get('/user/info')
static GetUserInfo(userId: number) {
  return Res<{
    id: number
    name: string
    email: string
  }>()
}
```

## 最佳实践

### 1. 模块化组织

```javascript
// api/user.js
@ConnectStrawPlus({...})
export class UserApi {
  @Post('/user/login')
  static Login(data: LoginParams) {
    return Res<LoginResponse>()
  }
}

// api/product.js
@ConnectStrawPlus({...})
export class ProductApi {
  @Get('/product/list')
  static List(params: ListParams) {
    return Res<Product[]>()
  }
}
```

### 2. 类型定义

```typescript
interface LoginParams {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  userInfo: {
    id: number
    name: string
    avatar: string
  }
}

@Post('/user/login')
static Login(data: LoginParams) {
  return Res<LoginResponse>()
}
```

### 3. 错误处理

```javascript
@ConnectStrawPlus({
  // ...
  interceptors: {
    fail: (error) => {
      // 统一错误处理
      if (error.status === 401) {
        // 未授权，跳转到登录页
        window.location.href = '/login'
      }
      throw error
    }
  }
})
```

## 注意事项

1. **禁止实例化**: 使用 StrawPlus 创建的类禁止实例化，只能使用静态方法
2. **唯一标识**: 每个 API 类的 name 必须是唯一的
3. **类型定义**: 建议使用 TypeScript 获得更好的类型提示
4. **错误处理**: 配置拦截器统一处理错误

## 相关链接

- [StrawApi 文档](/guide/straw-api) - 了解函数式编程方式
- [工具函数文档](/guide/utils/) - 了解所有可用的工具函数
- [API 参考](/api/) - 查看详细的 API 文档
