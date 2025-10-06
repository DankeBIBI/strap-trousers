# StrawApi

StrawApi 提供函数式编程方式，具有更好的 TypeScript 支持。

## 基本用法

### 创建 API 实例

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
    
    createProduct: () => ({
      url: 'product/create',
      method: 'POST'
    }),
    
    updateProduct: () => ({
      url: 'product/update',
      method: 'PUT'
    }),
    
    deleteProduct: () => ({
      url: 'product/delete',
      method: 'DELETE'
    })
  }
})
```

### 使用 API

```javascript
// 调用接口
const products = await api.getProductList()
const newProduct = await api.createProduct({ name: '新产品', price: 99.99 })
const updated = await api.updateProduct({ id: 1, name: '更新产品' })
const deleted = await api.deleteProduct({ id: 1 })
```

## 对象写法（推荐）

对象写法支持更好的类型推断：

```javascript
const api = connectStraw({
  config: {
    lib: axios,
    name: 'userApi',
    rootUrl: 'http://localhost:8202/'
  },
  action: {
    // 对象写法
    login: {
      url: 'user/login',
      method: 'POST',
      fn() {
        return {} as {
          token: string
          userInfo: {
            id: number
            name: string
            email: string
          }
        }
      }
    },
    
    getUserInfo: {
      url: 'user/info',
      method: 'GET',
      fn() {
        return {} as {
          id: number
          name: string
          age: number
          avatar: string
        }
      }
    },
    
    search: {
      url: 'user/search',
      method: 'GET',
      debounce: true, // 开启防抖
      fn() {
        return {} as {
          total: number
          list: any[]
        }
      }
    }
  }
})
```

## 高级配置

### 配置选项

```javascript
const api = connectStraw({
  config: {
    lib: axios,              // 请求库（必需）
    name: 'api',            // 唯一标识（必需）
    rootUrl: 'http://localhost:8202/', // 根URL（必需）
    timeout: 10000,         // 超时时间（可选）
    headers: {              // 请求头（可选）
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    },
    data: {                   // 公共参数（可选）
      appId: '123456',
      version: '1.0.0'
    },
    showLog: true,           // 显示日志（可选）
    injectStateCode: 201,    // 注入成功状态码（可选）
    miniAdapter: wx.request, // 小程序适配器（小程序环境必需）
    params: {},              // Axios配置参数（可选）
    injectSubMethods: true,  // 注入子方法（可选）
    defaultMethod: 'GET',    // 默认请求方法（可选）
    interceptors: {          // 拦截器（可选）
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
      },
      requestFail: (error) => {
        console.log('请求失败:', error)
        return error
      }
  },
  action: {
    // API 定义
  }
})
```

### 使用函数式写法

```javascript
const api = connectStraw({
  config: {
    lib: axios,
    name: 'dynamicApi',
    rootUrl: 'http://localhost:8202/'
  },
  action: ({ POST, GET, PUT, DELETE }) => ({
    // 使用函数参数创建动态 API
    searchUsers: (keyword) => GET({
      url: 'user/search',
      params: { keyword }
    }),
    
    createUser: (userData) => POST({
      url: 'user/create',
      data: userData
    }),
    
    updateUser: (userId, userData) => PUT({
      url: `user/${userId}`,
      data: userData
    }),
    
    deleteUser: (userId) => DELETE({
      url: `user/${userId}`
    })
  })
})
```

### 小程序环境

```javascript
// 微信小程序
const api = connectStraw({
  config: {
    lib: { Axios: wx.request },  // 注意：小程序环境需要这样配置
    name: "wechatApi",
    rootUrl: 'https://api.example.com',
    miniAdapter: wx.request       // 必需：指定小程序的请求方法
  },
  action: {
    getUserInfo: () => ({
      url: 'user/info',
      method: 'GET'
    })
  }
})

// uni-app
const api = connectStraw({
  config: {
    lib: { Axios: uni.request },
    name: "uniappApi", 
    rootUrl: 'https://api.example.com',
    miniAdapter: uni.request
  },
  action: {
    getUserInfo: () => ({
      url: 'user/info',
      method: 'GET'
    })
  }
})
```

### 注意事项

1. **必需字段**：`config` 中的 `lib`、`name`、`rootUrl` 是必需字段
2. **小程序适配**：在小程序环境中，必须配置 `miniAdapter` 字段
3. **请求库格式**：小程序环境的 `lib` 需要格式为 `{ Axios: wx.request }`
4. **类型支持**：对象写法提供了更好的 TypeScript 类型推断
5. **防抖功能**：可以通过 `debounce: true` 开启请求防抖
```

## 返回实例信息

StrawApi 返回的对象包含实例信息：

```javascript
const api = connectStraw({
  config: { /* ... */ },
  action: { /* ... */ }
})

// 访问实例信息
console.log(api.__Straw)     // 实例 Map
console.log(api.__ApiPool)   // 请求缓存池 Map
console.log(api.__Config)    // 配置信息
```

### 实例属性说明

- `__Straw`: 全局的 API 实例存储 Map，可以通过 `api.__Straw.get('myApi')` 获取特定 API 实例
- `__ApiPool`: 请求缓存池 Map，用于防抖和请求状态管理
- `__Config`: 当前 API 实例的完整配置对象，包含所有配置参数

## 最佳实践

### 1. 模块化组织

```javascript
// api/user.js
export const userApi = connectStraw({
  config: {
    lib: axios,
    name: 'userApi',
    rootUrl: 'http://localhost:8202/'
  },
  action: {
    login: {
      url: 'user/login',
      method: 'POST',
      fn() {
        return {} as LoginResponse
      }
    }
  }
})

// api/product.js
export const productApi = connectStraw({
  config: {
    lib: axios,
    name: 'productApi',
    rootUrl: 'http://localhost:8202/'
  },
  action: {
    list: {
      url: 'product/list',
      method: 'GET',
      fn() {
        return {} as Product[]
      }
    }
  }
})
```

### 2. 类型定义

```typescript
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

interface User {
  id: number
  name: string
  email: string
}

const api = connectStraw({
  config: { /* ... */ },
  action: {
    getUserList: {
      url: 'user/list',
      method: 'GET',
      fn() {
        return {} as ApiResponse<User[]>
      }
    }
  }
})
```

### 3. 环境配置

```javascript
// config/api.config.js
const isDev = process.env.NODE_ENV === 'development'

export const API_CONFIG = {
  rootUrl: isDev ? 'http://localhost:8202/' : 'https://api.production.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

// api/index.js
import { API_CONFIG } from '../config/api.config'

export const api = connectStraw({
  config: {
    lib: axios,
    name: 'mainApi',
    ...API_CONFIG
  },
  action: {
    // API 定义
  }
})
```

## 与 StrawPlus 的区别

| 特性 | StrawApi | StrawPlus |
|------|----------|-----------|
| 语法风格 | 函数式 | 装饰器 |
| TypeScript 支持 | ✅ 更好 | ✅ |
| 使用方式 | 创建实例 | 静态类 |
| 适用场景 | 函数式编程 | 面向对象 |
| 学习成本 | 较低 | 需要了解装饰器 |

## 注意事项

1. **唯一标识**: 每个 API 实例的 name 必须是唯一的
2. **类型定义**: 建议使用 TypeScript 获得更好的类型提示
3. **错误处理**: 配置拦截器统一处理错误
4. **性能优化**: 合理使用防抖功能

## 相关链接

- [StrawPlus 文档](/guide/straw-plus) - 了解装饰器用法
- [工具函数文档](/guide/utils/) - 了解所有可用的工具函数
- [API 参考](/api/) - 查看详细的 API 文档