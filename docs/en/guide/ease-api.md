# EaseApi

:::warning Deprecated
EaseApi is deprecated. It is recommended to use [StrawApi](./straw-api) instead.
:::

## Status Description

EaseApi is the first-generation API encapsulation solution in Strap-Trousers, using traditional class-based encapsulation. While it still works, we strongly recommend migrating to the more modern StrawApi.

## Migration to StrawApi

### Old EaseApi Usage

```javascript
import EaseApi from 'strap-trousers'

const api = new EaseApi({
  lib: axios,
  name: 'myApi',
  rootUrl: 'https://api.example.com',
  apiList: [
    {
      name: 'getUsers',
      url: '/users',
      method: 'GET'
    },
    {
      name: 'createUser',
      url: '/users',
      method: 'POST'
    }
  ]
})

// Use
const users = await api.getUsers()
```

### New StrawApi Usage

```javascript
import { connectStraw } from 'strap-trousers'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'myApi',
    rootUrl: 'https://api.example.com'
  },
  action: {
    getUsers: () => ({
      url: '/users',
      method: 'GET'
    }),
    createUser: (data) => ({
      url: '/users',
      method: 'POST',
      data
    })
  }
})

// Use
const users = await api.getUsers()
```

## Historical Implementation

### Core Implementation

```javascript
class createConnect {
  constructor(options) {
    this.lib = options.lib
    this.name = options.name
    this.rootUrl = options.rootUrl
    this.apiList = options.apiList
    
    // Process apiList
    this.apiList.forEach(api => {
      this[api.name] = this.createMethod(api)
    })
  }
  
  createMethod(api) {
    return async (params) => {
      return await this.lib({
        url: this.rootUrl + api.url,
        method: api.method,
        ...params
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
      method: 'GET'
    },
    {
      name: 'createUser',
      url: '/users',
      method: 'POST'
    },
    {
      name: 'updateUser',
      url: '/users/:id',
      method: 'PUT'
    },
    {
      name: 'deleteUser',
      url: '/users/:id',
      method: 'DELETE'
    }
  ]
})

// Use API
const users = await api.getUsers()
const newUser = await api.createUser({ name: 'John' })
await api.updateUser(1, { name: 'Jane' })
await api.deleteUser(1)
```

## Reasons for Deprecation

1. **Complex API Design**: EaseApi uses class-based encapsulation, resulting in a relatively complex API design
2. **Poor TypeScript Support**: Limited TypeScript support, unable to provide good type inference
3. **Lack of Flexibility**: The apiList configuration method is not flexible enough to support complex scenarios
4. **Maintenance Difficulty**: Class-based encapsulation increases maintenance difficulty and is not conducive to code reuse

## Related Links

- [StrawApi Guide](./straw-api) - Recommended API encapsulation solution
- [StrawPlus Guide](./straw-plus) - Decorator-based API encapsulation
- [Migration Guide](./migration) - Detailed migration guide