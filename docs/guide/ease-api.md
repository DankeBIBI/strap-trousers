# EaseApi

EaseApi 是 Strap-Trousers 的传统类式 API 封装方式，目前已废弃，建议使用 StrawApi 替代。

## 状态说明

<div style="padding: 12px; background-color: #fff3cd; border-left: 4px solid #ffc107; color: #856404;">
  <strong>⚠️ 已废弃</strong><br>
  EaseApi 已被标记为废弃，将在未来版本中移除。请使用 <a href="./straw-api">StrawApi</a> 替代。
</div>

## 迁移建议

### 从 EaseApi 迁移到 StrawApi

```javascript
// ❌ 旧的 EaseApi 用法（已废弃）
import { createConnect } from 'strap-trousers'

const api = new createConnect({
  lib: axios,
  rootUrl: 'https://api.example.com',
  apiList: [
    {
      fn: 'user',
      list: [
        { name: 'getUser', url: '/user/:id', method: 'GET' },
        { name: 'createUser', url: '/user', method: 'POST' },
      ],
    },
  ],
})

// ✅ 新的 StrawApi 用法（推荐）
import { connectStraw } from 'strap-trousers'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'myApi',
    rootUrl: 'https://api.example.com',
  },
  action: {
    getUser: (id) => ({
      url: `/user/${id}`,
      method: 'GET',
    }),
    createUser: (data) => ({
      url: '/user',
      method: 'POST',
      data,
    }),
  },
})
```

## 历史实现

EaseApi 的核心是 `createConnect` 类，提供了以下功能：

### 基本配置

```typescript
interface createOptions {
  lib: any // 请求库（必需）
  rootUrl: string // 根URL（必需）
  apiList: Array<apiList> // 接口列表（必需）
  timeout?: number // 超时时间（可选）
  headers?: any // 请求头（可选）
  interceptors?: {
    // 拦截器（可选）
    success?: Function
    fail?: Function
    beforeRequest?: Function
    requestFail?: Function
  }
  miniAdapter?: Function // 小程序适配器（可选）
  params?: any // 请求参数（可选）
  data?: any // 公共数据（可选）
  showLog?: boolean // 显示日志（可选）
  defaultMethod?: string // 默认请求方法（可选）
  injectSubMethods?: boolean // 注入子方法（可选）
  injectStateCode?: number // 注入状态码（可选）
}
```

### 使用方式

```javascript
import { createConnect } from 'strap-trousers'

const api = new createConnect({
  lib: axios,
  rootUrl: 'http://localhost:8202/',
  apiList: [
    {
      fn: 'user', // 一级方法名
      list: [
        { name: 'login', url: '/user/login', method: 'POST' },
        { name: 'info', url: '/user/info', method: 'GET' },
        { name: 'update', url: '/user/update', method: 'PUT' },
      ],
    },
  ],
})

// 调用方式
const result = await api.user('login', { username: 'admin', password: '123' })
// 或
const result2 = await api.user.login({ username: 'admin', password: '123' })
```

## 废弃原因

1. **API设计复杂**：需要理解多层嵌套的列表结构
2. **TypeScript支持差**：缺乏完整的类型推断
3. **使用方式不直观**：方法调用方式不够直观
4. **功能局限**：扩展性和灵活性不足

## 相关链接

- [StrawApi 文档](./straw-api.md) - 推荐的替代方案
- [StrawPlus 文档](./straw-plus.md) - 装饰器模式替代方案
