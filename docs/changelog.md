# 更新日志

## v1.0.0 (2024-01-01)

### ✨ 新功能

#### API 封装
- **StrawPlus 装饰器模式**: 基于装饰器的 API 封装方案
  - `@ConnectStrawPlus` - 类级装饰器，配置基础请求参数
  - `@Get`、`@Post`、`@Put`、`@Delete` - 方法级装饰器，定义 HTTP 请求方法
  - `@Debounce` - 防抖装饰器，控制请求频率
  - `Res` - 响应数据处理装饰器
  - 支持小程序环境适配
  
- **StrawApi 函数式模式**: 基于函数式的 API 封装方案
  - 链式调用支持
  - 灵活的请求配置
  - 拦截器支持
  - 小程序环境适配

#### 工具函数
- **数据处理工具**
  - `encryption` - 简单的字符串加密函数
  - `decrypt` - 对应的字符串解密函数
  
- **数组操作工具**
  - `splitArray` - 数组分割函数，支持大数据分批处理
  - `arrayFoldFront` - 数组重排函数，适用于表格数据处理
  
- **对象操作工具**
  - `deepClone` - 深拷贝函数，支持嵌套对象和数组
  - `copyValueOfTheSameKey` - 复制相同键值函数
  - `deleteSameKeyOfTheSameValue` - 删除相同键值函数
  
- **时间处理工具**
  - `splitTime` - 时间差计算函数，支持倒计时等功能

### 🚀 优化

- **TypeScript 支持**: 完整的 TypeScript 类型定义
- **模块化设计**: 支持按需导入，减少打包体积
- **错误处理**: 完善的错误处理机制
- **性能优化**: 防抖、缓存等性能优化措施

### 📖 文档

- **完整文档站点**: 使用 VitePress 构建的文档站点
- **API 参考**: 详细的 API 文档和使用示例
- **使用指南**: 从安装到高级使用的完整指南
- **工具函数文档**: 每个工具函数的详细说明和使用场景

### 🎯 特性亮点

1. **多种封装方式**: 提供装饰器和函数式两种 API 封装方案，满足不同开发习惯
2. **小程序支持**: 内置小程序环境适配，支持微信、支付宝等小程序平台
3. **丰富的工具函数**: 涵盖数据处理、数组操作、对象操作、时间处理等常用功能
4. **TypeScript 友好**: 完整的类型定义，提供优秀的开发体验
5. **轻量级**: 按需导入，无额外依赖（除 axios 外）
6. **易于扩展**: 模块化的设计，便于扩展和定制

### 🛠️ 技术栈

- **核心依赖**: axios（HTTP 请求）
- **开发语言**: TypeScript
- **构建工具**: Rollup
- **测试框架**: Jest
- **文档工具**: VitePress

### 📦 安装使用

```bash
# npm
npm install strap-trousers

# yarn
yarn add strap-trousers

# pnpm
pnpm add strap-trousers
```

### 🔧 基本用法

```typescript
// StrawPlus 装饰器模式
import { ConnectStrawPlus, Get } from 'strap-trousers'

@ConnectStrawPlus({ baseURL: 'https://api.example.com' })
class UserAPI {
  @Get('/users')
  getUsers() {}
}

// StrawApi 函数式模式
import { StrawApi } from 'strap-trousers'

const api = StrawApi({ baseURL: 'https://api.example.com' })
const users = await api.get('/users')

// 工具函数
import { encryption, splitArray, deepClone } from 'strap-trousers'

const encrypted = encryption('data')
const chunks = splitArray([1,2,3,4,5], 2)
const cloned = deepClone({ name: 'test' })
```

### 🎉 里程碑

- ✅ 核心功能开发完成
- ✅ TypeScript 类型定义完善
- ✅ 文档站点上线
- ✅ 单元测试覆盖
- ✅ 小程序环境测试
- ✅ npm 包发布

### 🙏 致谢

感谢所有贡献者的努力，让 Strap-Trousers 成为一个功能完善、易于使用的 JavaScript 库。

### 🔗 相关链接

- [GitHub 仓库](https://github.com/your-org/strap-trousers)
- [npm 包](https://www.npmjs.com/package/strap-trousers)
- [文档站点](https://your-docs-site.com)
- [问题反馈](https://github.com/your-org/strap-trousers/issues)

---

## 版本说明

我们遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号 (MAJOR)**: 不兼容的 API 修改
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

## 更新频率

- **主版本**: 每年 1-2 次重大更新
- **次版本**: 每月功能更新
- **修订版本**: 每周问题修复

---

*最后更新：2024年1月1日*