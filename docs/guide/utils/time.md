# 时间处理工具函数

Strap-Trousers 提供了时间差计算等时间处理相关的工具函数。

## splitTime - 时间差计算

计算当前时间与目标时间的时间差，返回格式化的时间对象。

```javascript
import { splitTime } from 'strap-trousers'

// 计算距离目标时间的时间差
const timeDiff = splitTime({
  time: '2024-12-31 23:59:59',
  fillWithZeros: true
})

console.log(timeDiff)
// 输出类似:
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

### 参数说明

```typescript
export function splitTime(data: {
  time: string | number  // 目标时间（可以是时间字符串或时间戳）
  fillWithZeros?: boolean // 是否用0填充（默认true）
}): {
  year: number
  month: number
  week: number
  day: string
  hour: string
  minute: string
  second: string
}
```

### 返回值

```typescript
{
  year: number,    // 年数差
  month: number,   // 月数差
  week: number,    // 周数差
  day: string,     // 天数差（填充0）
  hour: string,    // 小时数差（填充0）
  minute: string,  // 分钟数差（填充0）
  second: string   // 秒数差（填充0）
}
```

## 使用场景

### 1. 倒计时功能

```javascript
function createCountdown(targetTime) {
  const updateCountdown = () => {
    const diff = splitTime({
      time: targetTime,
      fillWithZeros: true
    })
    
    return {
      days: diff.day,
      hours: diff.hour,
      minutes: diff.minute,
      seconds: diff.second
    }
  }
  
  return updateCountdown
}

// 使用
const countdown = createCountdown('2024-12-31 23:59:59')

// 每秒更新
setInterval(() => {
  const { days, hours, minutes, seconds } = countdown()
  console.log(`${days}天 ${hours}:${minutes}:${seconds}`)
}, 1000)
```

### 2. 活动时间显示

```javascript
function formatActivityTime(startTime, endTime) {
  const now = new Date().getTime()
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  
  if (now < start) {
    // 活动未开始
    const diff = splitTime({ time: startTime })
    return `活动开始倒计时: ${diff.day}天${diff.hour}时${diff.minute}分`
  } else if (now > end) {
    return '活动已结束'
  } else {
    // 活动进行中
    const diff = splitTime({ time: endTime })
    return `活动结束倒计时: ${diff.day}天${diff.hour}时${diff.minute}分`
  }
}

// 使用
const message = formatActivityTime(
  '2024-01-01 00:00:00',
  '2024-01-07 23:59:59'
)
console.log(message)
```

### 3. 用户注册时间显示

```javascript
function formatRegistrationTime(registrationTime) {
  const diff = splitTime({ time: registrationTime })
  
  if (diff.year > 0) {
    return `注册于${diff.year}年前`
  } else if (diff.month > 0) {
    return `注册于${diff.month}个月前`
  } else if (diff.week > 0) {
    return `注册于${diff.week}周前`
  } else if (parseInt(diff.day) > 0) {
    return `注册于${parseInt(diff.day)}天前`
  } else if (parseInt(diff.hour) > 0) {
    return `注册于${parseInt(diff.hour)}小时前`
  } else if (parseInt(diff.minute) > 0) {
    return `注册于${parseInt(diff.minute)}分钟前`
  } else {
    return '刚刚注册'
  }
}

// 使用
const regTime = '2023-06-01 10:30:00'
const displayTime = formatRegistrationTime(regTime)
console.log(displayTime) // 输出: 注册于X个月前
```

### 4. 缓存过期检查

```javascript
function isCacheExpired(cacheTime, expireMinutes) {
  const expireTime = new Date(cacheTime).getTime() + expireMinutes * 60 * 1000
  const diff = splitTime({ time: expireTime })
  
  // 如果秒数为负数，说明已经过期
  return parseInt(diff.second) < 0
}

// 使用
const cacheTime = '2024-01-01 10:00:00'
const isExpired = isCacheExpired(cacheTime, 30) // 30分钟过期
console.log(isExpired ? '缓存已过期' : '缓存有效')
```

### 5. 工作时间计算

```javascript
function calculateWorkHours(startTime, endTime) {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  
  // 计算总时间差
  const totalDiff = splitTime({ 
    time: endTime,
    fillWithZeros: false
  })
  
  // 转换为小时
  const totalHours = 
    parseInt(totalDiff.day) * 24 + 
    parseInt(totalDiff.hour) + 
    parseInt(totalDiff.minute) / 60
  
  return {
    totalHours: totalHours.toFixed(2),
    days: totalDiff.day,
    hours: totalDiff.hour,
    minutes: totalDiff.minute
  }
}

// 使用
const workHours = calculateWorkHours(
  '2024-01-01 09:00:00',
  '2024-01-01 18:30:00'
)
console.log(`工作时长: ${workHours.totalHours}小时`)
```

## 格式化选项

### 注意事项

1. **时间计算方式**：函数计算的是当前时间与目标时间的时间差，如果目标时间已经过去，返回的值会是负数
2. **时间格式支持**：支持多种时间格式，包括时间字符串和时间戳
3. **性能考虑**：对于频繁调用，建议缓存结果或使用防抖节流
4. **精度问题**：计算结果以秒为单位，可能存在微小的精度误差

### fillWithZeros 参数

```javascript
// 使用0填充（默认）
const withZeros = splitTime({
  time: '2024-12-31 23:59:59',
  fillWithZeros: true
})
console.log(withZeros.day)   // "02"
console.log(withZeros.hour)  // "14"

// 不使用0填充
const withoutZeros = splitTime({
  time: '2024-12-31 23:59:59',
  fillWithZeros: false
})
console.log(withoutZeros.day)   // 2
console.log(withoutZeros.hour)  // 14
```

## 时间格式支持

### 1. 时间字符串

```javascript
// 标准格式
const diff1 = splitTime({ time: '2024-12-31 23:59:59' })

// ISO格式
const diff2 = splitTime({ time: '2024-12-31T23:59:59.000Z' })

// 简写格式
const diff3 = splitTime({ time: '2024/12/31 23:59:59' })
```

### 2. 时间戳

```javascript
// 毫秒时间戳
const timestamp = new Date('2024-12-31 23:59:59').getTime()
const diff = splitTime({ time: timestamp })

// 秒级时间戳（需要转换）
const secondTimestamp = Math.floor(Date.now() / 1000)
const diff2 = splitTime({ time: secondTimestamp * 1000 })
```

## 实际应用示例

### 倒计时组件

```javascript
class CountdownTimer {
  constructor(targetTime, onUpdate, onComplete) {
    this.targetTime = targetTime
    this.onUpdate = onUpdate
    this.onComplete = onComplete
    this.interval = null
  }
  
  start() {
    this.interval = setInterval(() => {
      const diff = splitTime({
        time: this.targetTime,
        fillWithZeros: true
      })
      
      // 检查是否到期
      if (parseInt(diff.day) <= 0 && 
          parseInt(diff.hour) <= 0 && 
          parseInt(diff.minute) <= 0 && 
          parseInt(diff.second) <= 0) {
        this.stop()
        this.onComplete && this.onComplete()
        return
      }
      
      // 更新显示
      this.onUpdate && this.onUpdate({
        days: diff.day,
        hours: diff.hour,
        minutes: diff.minute,
        seconds: diff.second
      })
    }, 1000)
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }
}

// 使用
const timer = new CountdownTimer(
  '2024-12-31 23:59:59',
  (time) => {
    console.log(`${time.days}:${time.hours}:${time.minutes}:${time.seconds}`)
  },
  () => {
    console.log('倒计时结束！')
  }
)

timer.start()
```

## 性能考虑

1. **频繁调用**: 避免在循环中频繁调用，可以缓存结果
2. **大量计算**: 对于大量时间计算，考虑使用 Web Worker
3. **内存管理**: 及时清理定时器避免内存泄漏

```javascript
// 优化：缓存计算结果
function createCachedSplitTime() {
  let cache = new Map()
  
  return function(targetTime, fillWithZeros = true) {
    const key = `${targetTime}_${fillWithZeros}`
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = splitTime({ time: targetTime, fillWithZeros })
    cache.set(key, result)
    
    // 限制缓存大小
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }
    
    return result
  }
}

const cachedSplitTime = createCachedSplitTime()
```