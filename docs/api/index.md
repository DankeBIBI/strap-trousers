# API 参考

Strap-Trousers 提供了两种主要的 API 封装方式：StrawPlus（装饰器模式）和 StrawApi（函数式模式），以及丰富的工具函数。

## 核心 API

### StrawPlus 装饰器

基于装饰器模式的 API 封装，使用类的方式定义接口。

```typescript
import { StrawPlus, ConnectStrawPlus, Get, Post } from 'strap-trousers'

@ConnectStrawPlus({
  baseURL: 'https://api.example.com',
  timeout: 5000
})
class UserAPI {
  @Get('/users')
  getUsers(params: any) {
    return params
  }
  
  @Post('/users')
  createUser(data: any) {
    return data
  }
}

const userAPI = new UserAPI()
const users = await userAPI.getUsers({ page: 1 })
```

详细文档：[StrawPlus API](../guide/straw-plus.md)

### StrawApi 函数式

基于函数式的 API 封装，提供更灵活的编程方式。

```typescript
import { connectStraw } from 'strap-trousers'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'api',
    rootUrl: 'https://api.example.com',
    timeout: 5000
  },
  action: {
    getUsers: () => ({
      url: '/users',
      method: 'GET'
    }),
    createUser: () => ({
      url: '/users',
      method: 'POST'
    })
  }
})

// 使用
const users = await api.getUsers({ page: 1 })
const newUser = await api.createUser({ name: 'John' })
```

详细文档：[StrawApi API](../guide/straw-api.md)

## 工具函数 API

### 数据处理

#### encryption - 数据加密

```typescript
function encryption(data: string): string
```

加密字符串数据，使用简单的字符替换算法。

```javascript
import { encryption } from 'strap-trousers'

const encrypted = encryption('sensitive data')
console.log(encrypted) // 加密后的字符串
```

#### decrypt - 数据解密

```typescript
function decrypt(data: string): string
```

解密 `encryption` 函数加密的数据。

```javascript
import { decrypt } from 'strap-trousers'

const decrypted = decrypt(encryptedData)
console.log(decrypted) // 原始数据
```

详细文档：[数据处理工具](../guide/utils/data.md)

### 数组操作

#### splitArray - 数组分割

```typescript
function splitArray<T>(array: T[], size: number): T[][]
```

将数组按指定大小分割成多个子数组。

```javascript
import { splitArray } from 'strap-trousers'

const arr = [1, 2, 3, 4, 5, 6]
const chunks = splitArray(arr, 2)
console.log(chunks) // [[1, 2], [3, 4], [5, 6]]
```

#### arrayFoldFront - 数组折叠前置

```typescript
function arrayFoldFront<T>(array: T[], columns: number, concat?: boolean): T[][] | T[]
```

将数组元素按列分配，并将元素横向前置。

```javascript
import { arrayFoldFront } from 'strap-trousers'

const array = [1, 2, 3, 4, 5, 6, 7, 8]
const result = arrayFoldFront(array, 3)
console.log(result) // [[1, 4, 7], [2, 5, 8], [3, 6]]

// 合并结果
const result2 = arrayFoldFront(array, 3, true)
console.log(result2) // [1, 4, 7, 2, 5, 8, 3, 6]
```

详细文档：[数组操作工具](../guide/utils/array.md)

### 对象操作

#### deepClone - 深拷贝

```typescript
function deepClone<T>(obj: T): T
```

深度克隆对象，支持嵌套对象和数组。

```javascript
import { deepClone } from 'strap-trousers'

const original = { a: 1, b: { c: 2 } }
const cloned = deepClone(original)
cloned.b.c = 3
console.log(original.b.c) // 2 (原对象不受影响)
```

#### copyValueOfTheSameKey - 复制相同键的值

```typescript
function copyValueOfTheSameKey(options: {
  dataSource: object
  targetSource: object
  exclude?: string[]
}): object
```

将源对象中与目标对象相同键的值复制到目标对象。

```javascript
import { copyValueOfTheSameKey } from 'strap-trousers'

const result = copyValueOfTheSameKey({
  dataSource: { a: 1, b: 2, c: 3 },
  targetSource: { a: 0, b: 0, d: 4 }
})
console.log(result) // { a: 1, b: 2, d: 4 }

// 排除特定字段
const result2 = copyValueOfTheSameKey({
  dataSource: { a: 1, b: 2, c: 3 },
  targetSource: { a: 0, b: 0, d: 4 },
  exclude: ['b']
})
console.log(result2) // { a: 1, b: 0, d: 4 }

#### formatString - 字符串格式转换

```typescript
function formatString(str: string): string
```

将字符串中的字符按照预定义规则进行映射转换。

```javascript
import { formatString } from 'strap-trousers'

// 基本使用
const result = formatString('a')
console.log(result) // "zy"

// 反向映射
const original = formatString('zy')
console.log(original) // "a"
```

#### deleteSameKeyOfTheSameValue - 删除相同键值

```typescript
function deleteSameKeyOfTheSameValue(options: {
  befor: object
  after: object
  exclude?: (string | number)[]
}): object
```

删除目标对象中与源对象相同键且相同值的属性。

```javascript
import { deleteSameKeyOfTheSameValue } from 'strap-trousers'

const result = deleteSameKeyOfTheSameValue({
  befor: { a: 1, b: 2 },
  after: { a: 1, b: 3, c: 4 }
})
console.log(result) // { b: 3, c: 4 }

// 排除特定字段
const result2 = deleteSameKeyOfTheSameValue({
  befor: { a: 1, b: 2 },
  after: { a: 1, b: 2, c: 4 },
  exclude: ['b']
})
console.log(result2) // { a: 1, b: 2, c: 4 }

详细文档：[对象操作工具](../guide/utils/object.md)

### 时间处理

#### splitTime - 时间差计算

```typescript
interface dataDto {
  time: string | number
  fillWithZeros?: boolean
}

function splitTime(data: dataDto): {
  year: number
  month: number
  week: number
  day: string
  hour: string
  minute: string
  second: string
}
```

计算当前时间与目标时间的时间差。

```javascript
import { splitTime } from 'strap-trousers'

const diff = splitTime({
  time: '2024-12-31 23:59:59',
  fillWithZeros: true
})

console.log(diff)
// {
//   year: 0,
//   month: 3,
//   week: 12,
//   day: '85',
//   hour: '14',
//   minute: '30',
//   second: '45'
// }
```

详细文档：[时间处理工具](../guide/utils/time.md)

## 类型定义

### 请求配置

```typescript
interface RequestConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  // ... 其他 axios 配置
}
```

### 响应数据

```typescript
interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: RequestConfig
}
```

### 装饰器选项

```typescript
interface ConnectStrawPlusOptions {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  debounce?: number | DebounceOptions
  miniprogram?: boolean
  // ... 其他配置
}

interface DebounceOptions {
  wait: number
  immediate?: boolean
}
```

## 错误处理

### 请求错误

```typescript
try {
  const response = await api.get('/users')
} catch (error) {
  if (error.response) {
    // 服务器响应错误
    console.log(error.response.status)
    console.log(error.response.data)
  } else if (error.request) {
    // 请求发送失败
    console.log('请求发送失败')
  } else {
    // 其他错误
    console.log('Error:', error.message)
  }
}
```

### 工具函数错误

```typescript
// 工具函数通常会返回默认值而不是抛出错误
try {
  const result = splitTime({ time: 'invalid-time' })
  // 可能会返回默认的时间差对象
} catch (error) {
  console.error('时间计算失败:', error)
}
```

## 使用示例

### 完整示例

```typescript
import { StrawApi, encryption, splitArray, deepClone, splitTime } from 'strap-trousers'

// 创建 API 实例
const api = StrawApi({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 获取用户数据并处理
async function getAndProcessUsers() {
  try {
    // 获取用户数据
    const response = await api.get('/users', { page: 1, limit: 100 })
    const users = response.data
    
    // 深拷贝数据
    const processedUsers = deepClone(users)
    
    // 分批处理
    const batches = splitArray(processedUsers, 20)
    
    // 处理每批数据
    for (const batch of batches) {
      // 加密敏感信息
      const encryptedBatch = batch.map(user => ({
        ...user,
        email: encryption(user.email)
      }))
      
      // 发送到处理服务
      await api.post('/process-users', encryptedBatch)
    }
    
    // 记录处理时间
    const processTime = splitTime({ 
      time: Date.now() - 3600000, // 1小时前
      fillWithZeros: true 
    })
    
    console.log(`处理完成，用时: ${processTime.hour}:${processTime.minute}:${processTime.second}`)
    
  } catch (error) {
    console.error('处理失败:', error)
  }
}

// 执行\getAndProcessUsers()
```

## 相关链接

- [安装指南](../guide/installation.md)
- [快速开始](../guide/getting-started.md)
- [StrawPlus 详细文档](../guide/straw-plus.md)
- [StrawApi 详细文档](../guide/straw-api.md)
- [工具函数详细文档](../guide/utils/index.md)