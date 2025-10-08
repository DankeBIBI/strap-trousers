# Quick Start

This guide will help you quickly get started with Strap-Trousers.

## Basic Usage

### 1. Create API Instance

```javascript
import axios from 'axios'
import { connectStraw } from 'strap-trousers'

// Create API instance
const api = connectStraw({
  config: {
    lib: axios, // Request library
    name: 'myApi', // Unique identifier
    rootUrl: 'https://api.example.com', // Root URL
    timeout: 10000, // Timeout (optional)
    headers: {
      // Request headers (optional)
      'Content-Type': 'application/json',
    },
  },
  action: {
    // Define API methods
    getUsers: () => ({
      url: '/users',
      method: 'GET',
    }),

    createUser: (data) => ({
      url: '/users',
      method: 'POST',
      data,
    }),

    updateUser: (id, data) => ({
      url: `/users/${id}`,
      method: 'PUT',
      data,
    }),

    deleteUser: (id) => ({
      url: `/users/${id}`,
      method: 'DELETE',
    }),
  },
})
```

### 2. Use API

```javascript
// Get user list
const users = await api.getUsers()
console.log(users)

// Create user
const newUser = await api.createUser({
  name: 'John Doe',
  email: 'john@example.com',
})

// Update user
const updatedUser = await api.updateUser(1, {
  name: 'John Smith',
})

// Delete user
await api.deleteUser(1)
```

## Utility Functions

Strap-Trousers also provides rich utility functions:

### Data Processing

```javascript
import { encryption, decrypt } from 'strap-trousers'

// Encrypt data
const encrypted = encryption('sensitive data')
console.log(encrypted)

// Decrypt data
const decrypted = decrypt(encrypted)
console.log(decrypted) // 'sensitive data'
```

### Array Operations

```javascript
import { splitArray, arrayFoldFront } from 'strap-trousers'

// Split array
const arr = [1, 2, 3, 4, 5, 6]
const chunks = splitArray(arr, 2)
console.log(chunks) // [[1, 2], [3, 4], [5, 6]]

// Array folding
const folded = arrayFoldFront([1, 2, 3, 4, 5, 6], 3)
console.log(folded) // [[1, 4], [2, 5], [3, 6]]
```

### Object Operations

```javascript
import { deepClone, copyValueOfTheSameKey } from 'strap-trousers'

// Deep clone
const original = { a: 1, b: { c: 2 } }
const cloned = deepClone(original)
cloned.b.c = 3
console.log(original.b.c) // 2 (original unchanged)

// Copy same key values
const result = copyValueOfTheSameKey({
  dataSource: { a: 1, b: 2, c: 3 },
  targetSource: { a: 0, b: 0, d: 4 },
})
console.log(result) // { a: 1, b: 2, d: 4 }
```

### Time Processing

```javascript
import { splitTime } from 'strap-trousers'

// Calculate time difference
const timeDiff = splitTime({
  time: '2024-12-31 23:59:59',
})
console.log(timeDiff)
// { year: 0, month: 0, week: 0, day: 1, hour: 2, minute: 30, second: 45 }
```

## Mini-Program Environment

```javascript
// WeChat Mini Program
const api = connectStraw({
  config: {
    lib: { Axios: wx.request },
    name: 'wechatApi',
    rootUrl: 'https://api.example.com',
    miniAdapter: wx.request,
  },
  action: {
    getUserInfo: () => ({
      url: '/user/info',
      method: 'GET',
    }),
  },
})
```

## Next Steps

- [StrawApi Guide](./straw-api) - Learn more about functional API encapsulation
- [StrawPlus Guide](./straw-plus) - Learn about decorator-based API encapsulation
- [Utility Functions](../utils/) - Explore more utility functions
