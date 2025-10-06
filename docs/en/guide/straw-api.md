# StrawApi

StrawApi is a functional programming-based API encapsulation solution that provides better TypeScript support and more flexible configuration options.

## Basic Usage

### Creating API Instance

```javascript
import { connectStraw } from 'strap-trousers'

const api = connectStraw({
  config: {
    lib: axios,                    // Request library
    name: 'myApi',                // Unique identifier
    rootUrl: 'https://api.example.com', // Root URL
    timeout: 10000,               // Timeout (optional)
    headers: {                    // Request headers (optional)
      'Content-Type': 'application/json'
    }
  },
  action: {
    // Define API methods
    getUsers: () => ({
      url: '/users',
      method: 'GET'
    }),
    
    createUser: (data) => ({
      url: '/users',
      method: 'POST',
      data
    }),
    
    updateUser: (id, data) => ({
      url: `/users/${id}`,
      method: 'PUT',
      data
    }),
    
    deleteUser: (id) => ({
      url: `/users/${id}`,
      method: 'DELETE'
    })
  }
})
```

### Using API

```javascript
// Get user list
const users = await api.getUsers()

// Create user
const newUser = await api.createUser({
  name: 'John Doe',
  email: 'john@example.com'
})

// Update user
const updatedUser = await api.updateUser(1, {
  name: 'John Smith'
})

// Delete user
await api.deleteUser(1)
```

## Configuration Options

### Required Fields

```javascript
{
  config: {
    lib: axios,                    // Request library
    name: 'myApi',                // Unique identifier
    rootUrl: 'https://api.example.com' // Root URL
  },
  action: {
    // API method definitions
  }
}
```

### Optional Fields

```javascript
{
  config: {
    lib: axios,
    name: 'myApi',
    rootUrl: 'https://api.example.com',
    timeout: 10000,               // Timeout (milliseconds)
    headers: {                    // Global headers
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    },
    debounce: {                   // Debounce configuration
      time: 300,                  // Debounce time
      immediate: false            // Whether to trigger immediately
    },
    miniAdapter: wx.request       // Mini-program adapter
  }
}
```

### Mini-Program Environment

#### WeChat Mini Program

```javascript
const api = connectStraw({
  config: {
    lib: { Axios: wx.request },
    name: 'wechatApi',
    rootUrl: 'https://api.example.com',
    miniAdapter: wx.request
  },
  action: {
    getUserInfo: () => ({
      url: '/user/info',
      method: 'GET'
    })
  }
})
```

#### uni-app

```javascript
const api = connectStraw({
  config: {
    lib: { Axios: uni.request },
    name: 'uniApi',
    rootUrl: 'https://api.example.com',
    miniAdapter: uni.request
  },
  action: {
    getUserInfo: () => ({
      url: '/user/info',
      method: 'GET'
    })
  }
})
```

## Best Practices

### Modular Organization

```javascript
// api/user.js
export const userApi = connectStraw({
  config: {
    lib: axios,
    name: 'userApi',
    rootUrl: 'https://api.example.com'
  },
  action: {
    getUsers: () => ({ url: '/users', method: 'GET' }),
    createUser: (data) => ({ url: '/users', method: 'POST', data }),
    updateUser: (id, data) => ({ url: `/users/${id}`, method: 'PUT', data }),
    deleteUser: (id) => ({ url: `/users/${id}`, method: 'DELETE' })
  }
})

// api/product.js
export const productApi = connectStraw({
  config: {
    lib: axios,
    name: 'productApi',
    rootUrl: 'https://api.example.com'
  },
  action: {
    getProducts: () => ({ url: '/products', method: 'GET' }),
    getProduct: (id) => ({ url: `/products/${id}`, method: 'GET' }),
    createProduct: (data) => ({ url: '/products', method: 'POST', data })
  }
})

// main.js
import { userApi, productApi } from './api'

// Use
const users = await userApi.getUsers()
const products = await productApi.getProducts()
```

### TypeScript Support

```typescript
import { connectStraw } from 'strap-trousers'

interface User {
  id: number
  name: string
  email: string
}

interface CreateUserData {
  name: string
  email: string
}

const api = connectStraw({
  config: {
    lib: axios,
    name: 'userApi',
    rootUrl: 'https://api.example.com'
  },
  action: {
    getUsers: () => ({ url: '/users', method: 'GET' }),
    createUser: (data: CreateUserData) => ({ url: '/users', method: 'POST', data })
  }
})

// TypeScript will automatically infer return types
const users: User[] = await api.getUsers()
```

### Environment Configuration

```javascript
// config/api.config.js
export const API_CONFIG = {
  development: {
    rootUrl: 'http://localhost:3000',
    timeout: 5000
  },
  production: {
    rootUrl: 'https://api.example.com',
    timeout: 10000
  }
}

// api/index.js
import { API_CONFIG } from '../config/api.config'

const env = process.env.NODE_ENV || 'development'

export const api = connectStraw({
  config: {
    lib: axios,
    name: 'mainApi',
    ...API_CONFIG[env]
  },
  action: {
    // API definitions
  }
})
```