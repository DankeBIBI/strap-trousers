# 安装

## 使用包管理器安装

### npm
```bash
npm install strap-trousers
```

### yarn
```bash
yarn add strap-trousers
```

### pnpm
```bash
pnpm add strap-trousers
```

## 环境要求

- Node.js >= 14.0.0
- TypeScript >= 4.0.0 (可选，但推荐使用)

## 安装依赖

Strap-Trousers 需要配合 HTTP 客户端库使用，推荐使用 axios：

```bash
npm install axios
# 或
yarn add axios
# 或
pnpm add axios
```

## 小程序环境

对于小程序环境，你需要确保项目中已经包含了对应的请求库：

- 微信小程序：使用内置的 `wx.request`
- uni-app：使用 `uni.request`

## 验证安装

安装完成后，可以通过以下方式验证：

```javascript
import { createConnect, DKID } from 'strap-trousers'

// 测试工具函数
console.log(DKID()) // 输出生成的随机ID

// 测试 API 封装
const api = createConnect({
  lib: axios,
  rootUrl: 'https://api.example.com',
  apiList: [{
    fn: 'test',
    list: [{
      name: 'ping',
      url: '/ping'
    }]
  }]
})
```

## 下一步

- [快速开始](/guide/getting-started) - 学习基本用法
- [StrawPlus 使用指南](/guide/straw-plus) - 了解装饰器用法
- [StrawApi 使用指南](/guide/straw-api) - 了解函数式用法