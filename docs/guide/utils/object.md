# 对象操作工具函数

Strap-Trousers 提供了对象深拷贝、键值对比等对象操作相关的工具函数。

## deepClone - 深拷贝

创建对象的深拷贝，避免引用问题。

```javascript
import { deepClone } from 'strap-trousers'

const original = {
  name: '张三',
  age: 25,
  address: {
    city: '北京',
    district: '朝阳区'
  },
  hobbies: ['读书', '运动']
}

const cloned = deepClone(original)

// 修改拷贝对象不会影响原对象
cloned.address.city = '上海'
cloned.hobbies.push('音乐')

console.log(original.address.city) // 输出: 北京
console.log(original.hobbies.length) // 输出: 2
```

### 参数说明

- `obj`: 需要拷贝的对象

### 返回值

返回拷贝后的新对象

### 使用场景

#### 表单数据处理

```javascript
function handleFormSubmit(formData) {
  // 深拷贝表单数据，避免直接修改原始数据
  const submitData = deepClone(formData)
  
  // 添加额外的提交信息
  submitData.submitTime = new Date().toISOString()
  submitData.userId = getCurrentUserId()
  
  return submitData
}
```

#### 状态管理

```javascript
class StateManager {
  constructor(initialState) {
    this.state = deepClone(initialState)
    this.history = [deepClone(initialState)]
  }
  
  updateState(newState) {
    // 保存历史状态
    this.history.push(deepClone(this.state))
    
    // 更新当前状态
    this.state = deepClone(newState)
  }
  
  undo() {
    if (this.history.length > 1) {
      this.history.pop()
      this.state = deepClone(this.history[this.history.length - 1])
    }
  }
}
```

## copyValueOfTheSameKey - 复制相同键的值

将源对象中与目标对象相同键的值复制到目标对象。

```javascript
import { copyValueOfTheSameKey } from 'strap-trousers'

const source = {
  name: '李四',
  age: 30,
  city: '上海',
  country: '中国'
}

const target = {
  name: '张三',
  age: 25,
  city: '北京'
}

const result = copyValueOfTheSameKey({
  dataSource: source,
  targetSource: target
})

console.log(result)
// 输出: { name: '李四', age: 30, city: '上海' }
```

### 参数说明

- `dataSource`: 数据源对象（提供值的源对象）
- `targetSource`: 目标对象（接收值的对象）
- `exclude`: 可选，需要排除的键名数组

### 使用示例

#### 数据更新

```javascript
function updateUserProfile(currentData, newData) {
  // 只更新存在的字段，不添加新字段
  return copyValueOfTheSameKey({
    dataSource: newData,
    targetSource: currentData
  })
}

const currentProfile = {
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com'
}

const newProfile = {
  name: '张三丰',
  age: 26,
  email: 'zhangsanfeng@example.com',
  phone: '13800138000' // 这个字段不会被添加
}

const updated = updateUserProfile(currentProfile, newProfile)
console.log(updated)
// 输出: { name: '张三丰', age: 26, email: 'zhangsanfeng@example.com' }
```

#### 排除特定字段

```javascript
function updateSafeFields(original, updates) {
  return copyValueOfTheSameKey({
    dataSource: updates,
    targetSource: original,
    exclude: ['id', 'createdAt', 'updatedAt'] // 排除这些字段
  })
}

const document = {
  id: 123,
  title: '原文档',
  content: '文档内容',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-02'
}

const updates = {
  title: '新标题',
  content: '新内容',
  id: 999, // 这个字段会被排除
  createdAt: '2023-02-01' // 这个字段也会被排除
}

const safeUpdate = updateSafeFields(document, updates)
console.log(safeUpdate)
// 输出: { id: 123, title: '新标题', content: '新内容', createdAt: '2023-01-01', updatedAt: '2023-01-02' }
```

## deleteSameKeyOfTheSameValue - 删除相同且没更改的值

删除目标对象中与源对象相同键且相同值的属性。

### 参数说明

- `befor`: 源对象（改变前的数据）
- `after`: 目标对象（改变后的数据）
- `exclude`: 可选，需要排除的键名数组

### 返回值

返回处理后的目标对象

### 使用示例

```javascript
const before = {
  name: '张三',
  age: 25,
  city: '北京',
  email: 'zhangsan@example.com'
}

const after = {
  name: '李四',
  age: 25,
  city: '上海',
  email: 'zhangsan@example.com'
}

const result = deleteSameKeyOfTheSameValue({ befor: before, after: after })
console.log(result)
// 输出: { name: '李四', city: '上海' }
// age 和 email 因为值相同被删除
```

### 使用场景

#### 表单提交优化

```javascript
function getChangedFields(original, current) {
  // 深拷贝当前数据，避免修改原数据
  const currentCopy = deepClone(current)
  
  // 删除未更改的字段
  const changedFields = deleteSameKeyOfTheSameValue({
    befor: original,
    after: currentCopy
  })
  
  return changedFields
}

const originalData = {
  name: '张三',
  age: 25,
  city: '北京',
  phone: '13800138000'
}

const formData = {
  name: '张三丰', // 更改了
  age: 25,       // 未更改
  city: '上海',  // 更改了
  phone: '13800138000' // 未更改
}

const changedFields = getChangedFields(originalData, formData)
console.log(changedFields)
// 输出: { name: '张三丰', city: '上海' }

// 只提交更改的字段
await updateUser(changedFields)
```

#### 排除重要字段

```javascript
function getSignificantChanges(original, updated) {
  return deleteSameKeyOfTheSameValue({
    befor: original,
    after: updated,
    exclude: ['id', 'createdAt', 'version'] // 这些字段即使未更改也要保留
  })
}
```

## 综合示例

### 数据同步

```javascript
class DataSync {
  constructor() {
    this.localData = {}
    this.serverData = {}
  }
  
  // 更新本地数据
  updateLocal(newData) {
    // 深拷贝避免引用问题
    const safeData = deepClone(newData)
    
    // 只更新存在的字段
    this.localData = copyValueOfTheSameKey({
      dataSource: safeData,
      targetSource: this.localData
    })
  }
  
  // 获取需要同步的数据
  getSyncData() {
    // 删除未更改的字段
    return deleteSameKeyOfTheSameValue({
      befor: this.serverData,
      after: deepClone(this.localData)
    })
  }
  
  // 同步完成
  syncComplete(serverResponse) {
    this.serverData = deepClone(serverResponse)
  }
}
```

### 表单验证和处理

```javascript
function processFormSubmission(originalData, formData) {
  // 1. 深拷贝表单数据
  const safeFormData = deepClone(formData)
  
  // 2. 获取实际更改的字段
  const changedFields = deleteSameKeyOfTheSameValue({
    befor: originalData,
    after: safeFormData,
    exclude: ['id', 'updatedAt'] // 保留这些字段
  })
  
  // 3. 如果没有更改，返回null
  if (Object.keys(changedFields).length === 0) {
    return null
  }
  
  // 4. 添加更新时间
  changedFields.updatedAt = new Date().toISOString()
  
  return changedFields
}
```

## 性能考虑

1. **深拷贝性能**: 对于大型对象，深拷贝可能比较耗时
2. **内存使用**: 深拷贝会创建新的对象，注意内存使用
3. **循环引用**: deepClone 函数不处理循环引用

```javascript
// 对于大型对象，可以考虑只拷贝需要的部分
function shallowCloneSelected(obj, keys) {
  const result = {}
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  })
  return result
}
```