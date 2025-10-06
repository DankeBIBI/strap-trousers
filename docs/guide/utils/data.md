# 数据处理工具函数

Strap-Trousers 提供了数据加密、解密等数据处理相关的工具函数。

## encryption - 数据加密

对字符串进行加密处理。

```javascript
import { encryption } from 'strap-trousers'

const encrypted = encryption('hello world')
console.log(encrypted) // 输出加密后的字符串
```

### 实现原理

- 使用随机数进行加密
- 对字符进行大小写转换和数值运算
- 添加特殊标记符
- 依赖 `formatString` 函数进行字符串格式转换

### 注意事项

- 这是一个简单的加密实现，不适合用于高度敏感的数据
- 加密后的字符串包含特殊分隔符 `DKE` 和随机数
- 数字字符会被转换为乘法运算结果

## decrypt - 数据解密

对加密后的字符串进行解密。

```javascript
import { decrypt } from 'strap-trousers'

const encrypted = encryption('hello world')
const decrypted = decrypt(encrypted)
console.log(decrypted) // 输出: hello world
```

### 使用示例

```javascript
// 加密敏感数据
const sensitiveData = 'user_password_123'
const encryptedData = encryption(sensitiveData)

// 存储或传输加密数据
localStorage.setItem('secureData', encryptedData)

// 解密数据
const storedData = localStorage.getItem('secureData')
const originalData = decrypt(storedData)
console.log(originalData) // 输出: user_password_123
```

## 注意事项

1. **安全性**: 这是一个简单的加密实现，不适合用于高度敏感的数据
2. **完整性**: 加密和解密必须成对使用
3. **性能**: 对于大量数据的加密解密，建议使用专业的加密库
4. **依赖**: 依赖于 `formatString` 函数，确保在项目中正确导入
5. **特殊字符**: 加密过程中会处理 `%` 字符，将其转换为 `DKEBIBI`

## 实际应用场景

### 本地存储加密

```javascript
class SecureStorage {
  static set(key, value) {
    const encrypted = encryption(JSON.stringify(value))
    localStorage.setItem(key, encrypted)
  }
  
  static get(key) {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null
    try {
      const decrypted = decrypt(encrypted)
      return JSON.parse(decrypted)
    } catch (error) {
      console.error('解密失败:', error)
      return null
    }
  }
  
  static remove(key) {
    localStorage.removeItem(key)
  }
}

// 使用
SecureStorage.set('userInfo', { name: '张三', age: 25 })
const userInfo = SecureStorage.get('userInfo')
console.log(userInfo) // 输出: { name: '张三', age: 25 }
```

### URL参数加密

```javascript
// 加密URL参数
function encryptParams(params) {
  const paramString = new URLSearchParams(params).toString()
  return encryption(paramString)
}

// 解密URL参数
function decryptParams(encrypted) {
  const decrypted = decrypt(encrypted)
  return Object.fromEntries(new URLSearchParams(decrypted))
}

// 使用
const params = { userId: 123, token: 'abc123' }
const encrypted = encryptParams(params)
// 跳转到: /page?data=加密后的字符串

// 接收页面解密
const urlParams = new URLSearchParams(window.location.search)
const encryptedData = urlParams.get('data')
const originalParams = decryptParams(encryptedData)
console.log(originalParams) // 输出: { userId: '123', token: 'abc123' }
```

## 相关函数

- [formatString](/guide/utils/format) - 字符串格式转换，用于加密/解密过程中的字符映射
- [checkRequiredField](/guide/utils/check) - 必填字段检查

### formatString 函数说明

`formatString` 函数定义了字符的映射关系，用于加密和解密过程中的字符映射转换。详细文档请参考 [字符串处理工具](/guide/utils/format)。

## 性能考虑

```javascript
// 对于大量数据的处理，建议分批进行
function batchEncrypt(dataArray) {
  return dataArray.map(item => encryption(JSON.stringify(item)))
}

function batchDecrypt(encryptedArray) {
  return encryptedArray.map(item => {
    try {
      return JSON.parse(decrypt(item))
    } catch (error) {
      console.error('解密失败:', error)
      return null
    }
  }).filter(Boolean)
}
```