# 数组操作工具函数

Strap-Trousers 提供了数组分割、折叠等数组操作相关的工具函数。

## splitArray - 数组分割

将数组按照指定数量分割成多个子数组。

```javascript
import { splitArray } from 'strap-trousers'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const result = splitArray(array, 3)
console.log(result)
// 输出: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

### 参数说明

- `array`: 需要分割的数组
- `num`: 每个子数组的元素数量

### 使用场景

#### 分页处理

```javascript
function paginate(items, itemsPerPage) {
  return splitArray(items, itemsPerPage)
}

const products = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `商品${i + 1}`
}))

const pages = paginate(products, 10)
console.log(`共${pages.length}页`)
// 第1页
console.log(pages[0]) // 前10个商品
```

#### 批量处理

```javascript
function batchProcess(items, batchSize, processor) {
  const batches = splitArray(items, batchSize)
  return Promise.all(
    batches.map(batch => processor(batch))
  )
}

// 批量上传文件
async function uploadFiles(files) {
  return batchProcess(files, 5, async (batch) => {
    console.log(`上传批次: ${batch.length}个文件`)
    // 执行上传逻辑
    return await uploadBatch(batch)
  })
}
```

## arrayFoldFront - 数组折叠前置

将数组元素按列分配，并将元素横向前置。

```javascript
import { arrayFoldFront } from 'strap-trousers'

const array = [1, 2, 3, 4, 5, 6, 7, 8]
const result = arrayFoldFront(array, 3)
console.log(result)
// 输出: [[1, 4, 7], [2, 5, 8], [3, 6]]
```

### 参数说明

- `array`: 需要处理的数组
- `columns`: 列数
- `concat`: 是否合并结果（可选，默认 false）

### 使用示例

#### 基础用法

```javascript
const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

// 3列
const result1 = arrayFoldFront(data, 3)
console.log(result1)
// 输出: [['A', 'D', 'G'], ['B', 'E'], ['C', 'F']]

// 合并结果
const result2 = arrayFoldFront(data, 3, true)
console.log(result2)
// 输出: ['A', 'D', 'G', 'B', 'E', 'C', 'F']
```

#### 表格数据重排

```javascript
function rearrangeTableData(data, columns) {
  return arrayFoldFront(data, columns)
}

const tableData = [
  '姓名', '年龄', '城市',
  '张三', 25, '北京',
  '李四', 30, '上海',
  '王五', 28, '广州'
]

// 重排为3列
const rearranged = rearrangeTableData(tableData, 3)
console.log(rearranged)
// 输出: 
// [
//   ['姓名', '张三', '王五'],
//   ['年龄', '李四'],
//   ['城市']
// ]
```

#### 图片网格布局

```javascript
function createImageGrid(images, columns) {
  return arrayFoldFront(images, columns)
}

const images = [
  'image1.jpg', 'image2.jpg', 'image3.jpg',
  'image4.jpg', 'image5.jpg', 'image6.jpg',
  'image7.jpg', 'image8.jpg'
]

// 创建3列的图片网格
const grid = createImageGrid(images, 3)
console.log(grid)
// 输出: [['image1.jpg', 'image4.jpg', 'image7.jpg'], ['image2.jpg', 'image5.jpg', 'image8.jpg'], ['image3.jpg', 'image6.jpg']]
```

## 实际应用场景

### 1. 数据可视化

```javascript
function prepareChartData(rawData, seriesCount) {
  // 将数据分配到多个系列中
  return arrayFoldFront(rawData, seriesCount)
}

const salesData = [100, 150, 200, 180, 220, 160, 190, 210, 170, 185]
const chartSeries = prepareChartData(salesData, 3)

// 用于图表的三个系列
const series1 = chartSeries[0] // [100, 180, 220, 210]
const series2 = chartSeries[1] // [150, 160, 170]
const series3 = chartSeries[2] // [200, 190, 185]
```

### 2. 任务分配

```javascript
function assignTasks(tasks, workers) {
  return arrayFoldFront(tasks, workers)
}

const tasks = [
  '任务A', '任务B', '任务C', '任务D', '任务E', '任务F'
]
const assignments = assignTasks(tasks, 3)

// 工人1: ['任务A', '任务D']
// 工人2: ['任务B', '任务E']
// 工人3: ['任务C', '任务F']
assignments.forEach((workerTasks, index) => {
  console.log(`工人${index + 1}: ${workerTasks.join(', ')}`)
})
```

### 3. 负载均衡

```javascript
function distributeLoad(requests, servers) {
  return arrayFoldFront(requests, servers)
}

const requests = Array.from({ length: 20 }, (_, i) => `请求${i + 1}`)
const serverCount = 4
const distribution = distributeLoad(requests, serverCount)

// 将请求分配到4台服务器
distribution.forEach((serverRequests, serverIndex) => {
  console.log(`服务器${serverIndex + 1}: ${serverRequests.length}个请求`)
})
```

## 性能考虑

对于大型数组，建议：

1. **分批处理**: 避免一次性处理过多数据
2. **内存管理**: 及时清理不需要的临时数组
3. **异步处理**: 对于耗时操作使用异步方式

```javascript
async function processLargeArray(array, processor, batchSize = 1000) {
  const batches = splitArray(array, batchSize)
  
  for (const batch of batches) {
    await processor(batch)
    // 可选：添加延迟避免阻塞
    await new Promise(resolve => setTimeout(resolve, 0))
  }
}
```

## 相关函数

- [splitArray](/guide/utils/array#splitarray-数组分割) - 数组分割
- [object操作函数](/guide/utils/object) - 对象相关操作

## 错误处理

```javascript
function safeArrayFoldFront(array, columns) {
  try {
    if (!Array.isArray(array)) {
      throw new Error('第一个参数必须是数组')
    }
    if (!Number.isInteger(columns) || columns <= 0) {
      throw new Error('列数必须是正整数')
    }
    return arrayFoldFront(array, columns)
  } catch (error) {
    console.error('数组折叠失败:', error)
    return []
  }
}
```