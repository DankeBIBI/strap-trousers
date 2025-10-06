# StrawPlus

StrawPlus is a decorator-based API encapsulation solution that provides cleaner and more elegant code organization.

## Basic Usage

### Creating API Class

```javascript
import { ConnectStrawPlus, Get, Post, Put, Delete } from 'strap-trousers'

@ConnectStrawPlus({
  lib: axios,
  name: 'userApi',
  rootUrl: 'https://api.example.com'
})
class UserApi {
  @Get('/users')
  getUsers() {}

  @Post('/users')
  createUser(data) {}

  @Put('/users/:id')
  updateUser(id, data) {}

  @Delete('/users/:id')
  deleteUser(id) {}
}

// Create instance
const userApi = new UserApi()
```

### Using API

```javascript
// Get user list
const users = await userApi.getUsers()

// Create user
const newUser = await userApi.createUser({
  name: 'John Doe',
  email: 'john@example.com'
})

// Update user
const updatedUser = await userApi.updateUser(1, {
  name: 'John Smith'
})

// Delete user
await userApi.deleteUser(1)
```

## Advanced Configuration

### Configuration Options

```javascript
@ConnectStrawPlus({
  lib: axios,
  name: 'userApi',
  rootUrl: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  }
})
class UserApi {
  // API methods
}
```

### Debounce Configuration

```javascript
import { Debounce } from 'strap-trousers'

@ConnectStrawPlus({
  lib: axios,
  name: 'searchApi',
  rootUrl: 'https://api.example.com'
})
class SearchApi {
  @Debounce(300) // 300ms debounce
  @Get('/search')
  search(keyword) {}
}
```

### Mini-Program Environment

```javascript
@ConnectStrawPlus({
  lib: { Axios: wx.request },
  name: 'wechatApi',
  rootUrl: 'https://api.example.com',
  miniAdapter: wx.request
})
class WechatApi {
  @Get('/user/info')
  getUserInfo() {}
}
```

## Decorator Details

### @ConnectStrawPlus

Class decorator used to configure basic API information.

```javascript
@ConnectStrawPlus({
  lib: axios,                    // Request library
  name: 'apiName',              // Unique identifier
  rootUrl: 'https://api.example.com', // Root URL
  timeout: 10000,               // Timeout (optional)
  headers: {                    // Request headers (optional)
    'Content-Type': 'application/json'
  },
  debounce: {                   // Global debounce (optional)
    time: 300,
    immediate: false
  },
  miniAdapter: wx.request       // Mini-program adapter (optional)
})
class ApiClass {
  // API methods
}
```

### Request Method Decorators

#### @Get(url)

```javascript
@Get('/users')
getUsers() {}

@Get('/users/:id')
getUser(id) {}
```

#### @Post(url)

```javascript
@Post('/users')
createUser(data) {}
```

#### @Put(url)

```javascript
@Put('/users/:id')
updateUser(id, data) {}
```

#### @Delete(url)

```javascript
@Delete('/users/:id')
deleteUser(id) {}
```

### @Debounce

Method decorator for debouncing requests.

```javascript
@Debounce(300) // 300ms debounce
timeout: 300,   // Debounce time
immediate: false // Whether to trigger immediately
```

### @Res

Response processing decorator (coming soon).

```javascript
@Res((response) => response.data)
@Get('/users')
getUsers() {}
```

## Best Practices

### Modular Organization

```javascript
// api/user.js
import { ConnectStrawPlus, Get, Post, Put, Delete } from 'strap-trousers'

@ConnectStrawPlus({
  lib: axios,
  name: 'userApi',
  rootUrl: 'https://api.example.com'
})
export class UserApi {
  @Get('/users')
  getUsers() {}

  @Post('/users')
  createUser(data) {}

  @Put('/users/:id')
  updateUser(id, data) {}

  @Delete('/users/:id')
  deleteUser(id) {}
}

// api/product.js
@ConnectStrawPlus({
  lib: axios,
  name: 'productApi',
  rootUrl: 'https://api.example.com'
})
export class ProductApi {
  @Get('/products')
  getProducts() {}

  @Get('/products/:id')
  getProduct(id) {}

  @Post('/products')
  createProduct(data) {}
}

// main.js
import { UserApi, ProductApi } from './api'

const userApi = new UserApi()
const productApi = new ProductApi()

// Use
const users = await userApi.getUsers()
const products = await productApi.getProducts()
```

### TypeScript Support

```typescript
import { ConnectStrawPlus, Get, Post } from 'strap-trousers'

interface User {
  id: number
  name: string
  email: string
}

interface CreateUserData {
  name: string
  email: string
}

@ConnectStrawPlus({
  lib: axios,
  name: 'userApi',
  rootUrl: 'https://api.example.com'
})
export class UserApi {
  @Get('/users')
  getUsers(): Promise<User[]> {
    return {} as any
  }

  @Post('/users')
  createUser(data: CreateUserData): Promise<User> {
    return {} as any
  }
}
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

// api/base.js
import { API_CONFIG } from '../config/api.config'

const env = process.env.NODE_ENV || 'development'

export class BaseApi {
  static getConfig() {
    return {
      lib: axios,
      ...API_CONFIG[env]
    }
  }
}

// api/user.js
import { ConnectStrawPlus } from 'strap-trousers'
import { BaseApi } from './base'

@ConnectStrawPlus({
  ...BaseApi.getConfig(),
  name: 'userApi'
})
export class UserApi {
  // API methods
}
```