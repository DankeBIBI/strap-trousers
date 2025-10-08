# EaseApi

EaseApi is the traditional class-based API encapsulation method in Strap-Trousers, which has been deprecated. It is recommended to use StrawApi as an alternative.

:::warning Deprecated
EaseApi is deprecated. It is recommended to use [StrawApi](./straw-api) instead.
:::

## Status Description

EaseApi is the traditional class-based API encapsulation method in Strap-Trousers, which has been deprecated. It is recommended to use StrawApi as an alternative.

<div style="padding: 12px; background-color: #fff3cd; border-left: 4px solid #ffc107; color: #856404;">
  <strong>⚠️ Deprecated</strong><br>
  EaseApi has been marked as deprecated and will be removed in future versions. Please use <a href="./straw-api">StrawApi</a> as an alternative.
</div>

## Migration Recommendation

### Migrating from EaseApi to StrawApi

```javascript
// ❌ Old EaseApi usage (deprecated)
import { createConnect } from 'strap-trousers'

const api = new createConnect({
  lib: axios,
  rootUrl: 'https://api.example.com',
  apiList: [
    {
      fn: 'user',
      list: [
        { name: 'getUser', url: '/user/:id', method: 'GET' },
        { name: 'createUser', url: '/user', method: 'POST' },
      ],
    },
  ],
})

// ✅ New StrawApi usage (recommended)
import { connectStraw } from 'strap-trousers'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'myApi',
    rootUrl: 'https://api.example.com',
  },
  action: {
    getUser: (id) => ({
      url: `/user/${id}`,
      method: 'GET',
    }),
    createUser: (data) => ({
      url: '/user',
      method: 'POST',
      data,
    }),
  },
})
```

## Historical Implementation

EaseApi's core is the `createConnect` class, which provides the following features:

### Basic Configuration

```typescript
interface createOptions {
  lib: any // Request library (required)
  rootUrl: string // Root URL (required)
  apiList: Array<apiList> // API list (required)
  timeout?: number // Timeout (optional)
  headers?: any // Request headers (optional)
  interceptors?: {
    // Interceptors (optional)
    success?: Function
    fail?: Function
    beforeRequest?: Function
    requestFail?: Function
  }
  miniAdapter?: Function // Mini program adapter (optional)
  params?: any // Request parameters (optional)
  data?: any // Common data (optional)
  showLog?: boolean // Show logs (optional)
  defaultMethod?: string // Default request method (optional)
  injectSubMethods?: boolean // Inject sub-methods (optional)
  injectStateCode?: number // Inject status code (optional)
}
```

### Usage Method

```javascript
import { createConnect } from 'strap-trousers'

const api = new createConnect({
  lib: axios,
  rootUrl: 'http://localhost:8202/',
  apiList: [
    {
      fn: 'user', // First-level method name
      list: [
        { name: 'login', url: '/user/login', method: 'POST' },
        { name: 'info', url: '/user/info', method: 'GET' },
        { name: 'update', url: '/user/update', method: 'PUT' },
      ],
    },
  ],
})

// Calling method
const result = await api.user('login', { username: 'admin', password: '123' })
// or
const result2 = await api.user.login({ username: 'admin', password: '123' })
```

### Core Implementation

```javascript
class createConnect {
  constructor(options) {
    this.lib = options.lib
    this.name = options.name
    this.rootUrl = options.rootUrl
    this.apiList = options.apiList

    // Process apiList
    this.apiList.forEach((api) => {
      this[api.name] = this.createMethod(api)
    })
  }

  createMethod(api) {
    return async (params) => {
      return await this.lib({
        url: this.rootUrl + api.url,
        method: api.method,
        ...params,
      })
    }
  }
}
```

### Usage Example

```javascript
const api = new createConnect({
  lib: axios,
  name: 'myApi',
  rootUrl: 'https://api.example.com',
  apiList: [
    {
      name: 'getUsers',
      url: '/users',
      method: 'GET',
    },
    {
      name: 'createUser',
      url: '/users',
      method: 'POST',
    },
    {
      name: 'updateUser',
      url: '/users/:id',
      method: 'PUT',
    },
    {
      name: 'deleteUser',
      url: '/users/:id',
      method: 'DELETE',
    },
  ],
})

// Use API
const users = await api.getUsers()
const newUser = await api.createUser({ name: 'John' })
await api.updateUser(1, { name: 'Jane' })
await api.deleteUser(1)
```

## Reasons for Deprecation

1. **Complex API Design**: EaseApi uses a multi-level nested list structure that is difficult to understand
2. **Poor TypeScript Support**: Limited TypeScript support, unable to provide complete type inference
3. **Unintuitive Usage**: Method calling methods are not intuitive enough
4. **Limited Functionality**: Insufficient extensibility and flexibility
5. **Maintenance Difficulty**: Class-based encapsulation increases maintenance difficulty and is not conducive to code reuse

## Related Links

- [StrawApi Guide](./straw-api) - Recommended API encapsulation solution
- [StrawPlus Guide](./straw-plus) - Decorator-based API encapsulation
