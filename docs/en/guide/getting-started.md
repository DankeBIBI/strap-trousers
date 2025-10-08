# Quick Start

This guide will help you quickly get started with Strap-Trousers.

## Basic Usage

### 1. Using StrawPlus (Recommended)

StrawPlus uses decorator syntax, making the code more concise and elegant:

```javascript
import axios from 'axios'
import { ConnectStrawPlus, Post, Get, Res } from 'strap-trousers'

@ConnectStrawPlus({
  lib: axios,
  name: "userApi",
  rootUrl: 'http://localhost:8202/',
  headers: {
    'Token': 'your-token',
  },
})
class UserApi {
  @Post('/user/login')
  static Login(data: { username: string; password: string }) {
    return Res<{ token: string; userInfo: any }>()
  }

  @Get('/user/list')
  static List(params?: { page: number; size: number }) {
    return Res<{ total: number; list: any[] }>()
  }
}

// Usage
const login = async () => {
  const result = await UserApi.Login({
    username: 'admin',
    password: '123456'
  })
  console.log(result)
}
```

### 2. Using StrawApi

StrawApi provides a functional programming approach:

```javascript
import { connectStraw } from 'strap-trousers'
import axios from 'axios'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'productApi',
    rootUrl: 'http://localhost:8202/',
    headers: {
      'Authorization': 'Bearer token'
    }
  },
  action: {
    // Function syntax
    getProductList: () => ({
      url: 'product/list',
      method: 'GET'
    }),

    // Object syntax (supports type inference)
    createProduct: {
      url: 'product/create',
      method: 'POST',
      fn() {
        return {} as {
          id: number
          name: string
          price: number
        }
      }
    }
  }
})

// Usage
const getProducts = async () => {
  const result = await api.getProductList()
  console.log(result)
}
```

### 3. Using Utility Functions

Strap-Trousers provides rich utility functions:

```javascript
import {
  DKID, // ID generation
  splitTime, // Time processing
  deepClone, // Deep clone
  encryption, // Encryption
  decrypt, // Decryption
  splitArray, // Array split
  arrayFoldFront, // Array fold
} from 'strap-trousers'

// Generate random ID
const id = DKID({ length: 12, hasUppercase: true })
console.log(id) // Output similar: aB3xK9mP2qR7

// Time difference calculation
const timeDiff = splitTime({
  time: '2024-12-31 23:59:59',
  fillWithZeros: true,
})
console.log(timeDiff) // { day: '01', hour: '23', minute: '59', second: '59' }

// Array split
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const result = splitArray(arr, 3)
console.log(result) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

## Advanced Configuration

### Configure Interceptors

```javascript
@ConnectStrawPlus({
  lib: axios,
  name: "api",
  rootUrl: 'http://localhost:8202/',
  interceptors: {
    // Request success
    success: (data) => {
      console.log('Request success:', data)
    },
    // Request failed
    fail: (error) => {
      console.log('Request failed:', error)
    },
    // Before request
    beforeRequest: (config) => {
      console.log('Before request:', config)
    }
  }
})
```

### Mini-Program Environment

```javascript
// WeChat Mini Program
@ConnectStrawPlus({
  lib: { Axios: wx.request },
  name: "miniApi",
  rootUrl: 'https://api.example.com',
  miniAdapter: wx.request
})

// uni-app
@ConnectStrawPlus({
  lib: { Axios: uni.request },
  name: "uniApi",
  rootUrl: 'https://api.example.com',
  miniAdapter: uni.request
})
```

## Best Practices

1. **Modular Organization**: Organize APIs by business modules, such as UserApi, ProductApi
2. **Type Definitions**: Use TypeScript for better type hints
3. **Error Handling**: Configure interceptors for unified error handling
4. **Environment Configuration**: Use environment variables to manage API addresses for different environments

## Next Steps

- [StrawPlus Detailed Guide](/guide/straw-plus) - Learn more about decorator usage
- [StrawApi Detailed Guide](/guide/straw-api) - Learn more about functional usage
- [Utility Functions Documentation](/guide/utils/) - Learn about all available utility functions
