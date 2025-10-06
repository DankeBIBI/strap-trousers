# 工具函数

Strap-Trousers 提供了一系列实用的工具函数，涵盖数据处理、数组操作、对象操作和时间处理等多个方面。

## 工具函数分类

### 数据处理工具

- [数据加密解密](data.md) - 提供 `encryption` 和 `decrypt` 函数
- [字符串处理](format.md) - 提供 `formatString` 函数
- 数值计算 - 提供数值计算相关的工具函数

### 数组操作工具

- [数组操作](array.md) - 提供 `splitArray` 和 `arrayFoldFront` 函数
- 数组排序 - 提供数组排序相关的函数
- 数组搜索 - 提供数组元素搜索函数

### 对象操作工具

- [对象操作](object.md) - 提供 `deepClone`、`copyValueOfTheSameKey` 和 `deleteSameKeyOfTheSameValue` 函数
- 对象合并 - 提供对象合并相关的函数
- 对象验证 - 提供对象属性验证函数

### 时间处理工具

- [时间处理](time.md) - 提供 `splitTime` 时间差计算函数
- 日期格式化 - 提供日期格式化函数
- 时区转换 - 提供时区相关的转换函数

## 快速开始

```javascript
// 导入所有工具函数
import * as utils from 'strap-trousers'

// 或者按需导入
import { encryption, splitArray, deepClone, splitTime } from 'strap-trousers'

// 使用示例
const encryptedData = encryption('sensitive data')
const chunks = splitArray([1,2,3,4,5,6], 2)
const clonedObj = deepClone({ name: 'test' })
const timeDiff = splitTime({ time: '2024-12-31 23:59:59' })
```

## 使用场景

### 数据处理
- 敏感数据加密存储
- 用户输入数据验证
- 数据格式转换

### 数组操作
- 大数据分页处理
- 批量任务分发
- 数据分组统计

### 对象操作
- 配置对象深拷贝
- 对象属性筛选
- 数据合并处理

### 时间处理
- 倒计时功能
- 活动时间显示
- 缓存过期检查

## 最佳实践

### 1. 模块化使用

```javascript
// utils/crypto.js
import { encryption, decrypt } from 'strap-trousers'

export const secureStorage = {
  set(key, value) {
    const encrypted = encryption(JSON.stringify(value))
    localStorage.setItem(key, encrypted)
  },
  
  get(key) {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null
    try {
      return JSON.parse(decrypt(encrypted))
    } catch {
      return null
    }
  }
}
```

### 2. 组合使用

```javascript
// 数据处理管道
import { deepClone, encryption, splitArray } from 'strap-trousers'

function processLargeData(data, batchSize = 100) {
  // 深拷贝原始数据
  const clonedData = deepClone(data)
  
  // 分批处理
  const batches = splitArray(clonedData, batchSize)
  
  return batches.map(batch => ({
    data: batch,
    encrypted: encryption(JSON.stringify(batch)),
    size: batch.length
  }))
}
```

### 3. 错误处理

```javascript
import { splitTime, deepClone } from 'strap-trousers'

function safeTimeCalculation(targetTime) {
  try {
    return splitTime({ time: targetTime })
  } catch (error) {
    console.error('时间计算失败:', error)
    return {
      year: 0, month: 0, week: 0,
      day: '00', hour: '00', minute: '00', second: '00'
    }
  }
}

function safeClone(obj) {
  try {
    return deepClone(obj)
  } catch (error) {
    console.error('对象克隆失败:', error)
    return null
  }
}
```

## 性能优化

### 1. 缓存策略

```javascript
// 创建工具函数缓存
const utilsCache = new Map()

function cachedDeepClone(obj) {
  const key = JSON.stringify(obj)
  if (utilsCache.has(key)) {
    return utilsCache.get(key)
  }
  
  const result = deepClone(obj)
  utilsCache.set(key, result)
  
  // 限制缓存大小
  if (utilsCache.size > 50) {
    const firstKey = utilsCache.keys().next().value
    utilsCache.delete(firstKey)
  }
  
  return result
}
```

### 2. 批量处理

```javascript
// 批量加密处理
function batchEncrypt(items) {
  return items.map(item => ({
    original: item,
    encrypted: encryption(JSON.stringify(item))
  }))
}

// 批量时间计算
function batchTimeCalculation(timeList) {
  return timeList.map(time => ({
    time,
    diff: splitTime({ time })
  }))
}
```

## 注意事项

1. **数据类型**: 确保传入正确的数据类型
2. **错误处理**: 重要操作需要添加错误处理
3. **性能考虑**: 避免在循环中频繁调用复杂函数
4. **内存管理**: 及时清理不再使用的缓存
5. **兼容性**: 检查目标环境的兼容性

## 相关链接

- [安装指南](../installation.md)
- [快速开始](../getting-started.md)
- [API 文档](../../api/index.md)
- [更新日志](../../changelog.md)