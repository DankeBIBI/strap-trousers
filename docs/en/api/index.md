# API Reference

Strap-Trousers provides a comprehensive API reference for all its features.

## Core APIs

### connectStraw

Functional API encapsulation method.

```javascript
import { connectStraw } from 'strap-trousers'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'myApi',
    rootUrl: 'https://api.example.com'
  },
  action: {
    getUsers: () => ({ url: '/users', method: 'GET' })
  }
})
```

### ConnectStrawPlus

Decorator-based API encapsulation class.

```javascript
import { ConnectStrawPlus, Get } from 'strap-trousers'

@ConnectStrawPlus({
  lib: axios,
  name: 'userApi',
  rootUrl: 'https://api.example.com'
})
class UserApi {
  @Get('/users')
  getUsers() {}
}
```

## Utility Functions

### Data Processing
- `encryption(str)` - Encrypt string
- `decrypt(str)` - Decrypt string
- `formatString(str)` - Format string conversion

### Array Operations
- `splitArray(arr, size)` - Split array into chunks
- `arrayFoldFront(arr, foldSize)` - Array folding
- `arrayFoldBack(arr, foldSize)` - Array reverse folding

### Object Operations
- `deepClone(obj)` - Deep clone object
- `copyValueOfTheSameKey(options)` - Copy values of same keys

### Time Processing
- `splitTime(options)` - Calculate time difference

### ID Generation
- `DKID(options)` - Generate random string ID

## Configuration Options

### connectStraw Configuration

```typescript
interface ConnectStrawConfig {
  config: {
    lib: any                 // Request library (axios, etc.)
    name: string             // Unique identifier
    rootUrl: string          // Root URL
    timeout?: number         // Timeout (milliseconds)
    headers?: object         // Request headers
    debounce?: {            // Debounce configuration
      time: number           // Debounce time
      immediate?: boolean    // Whether to trigger immediately
    }
    miniAdapter?: any       // Mini-program adapter
  }
  action: {
    [methodName: string]: (...args: any[]) => RequestConfig
  }
}
```

### ConnectStrawPlus Configuration

```typescript
interface ConnectStrawPlusConfig {
  lib: any                 // Request library
  name: string             // Unique identifier
  rootUrl: string          // Root URL
  timeout?: number         // Timeout
  headers?: object         // Request headers
  debounce?: {            // Global debounce
    time: number
    immediate?: boolean
  }
  miniAdapter?: any        // Mini-program adapter
}
```

## TypeScript Support

All APIs include complete TypeScript type definitions:

```typescript
import { connectStraw, encryption, splitArray } from 'strap-trousers'

// TypeScript will provide full type hints
const api = connectStraw({
  config: {
    lib: axios,
    name: 'myApi',
    rootUrl: 'https://api.example.com'
  },
  action: {
    getUsers: () => ({ url: '/users', method: 'GET' })
  }
})

// Utility functions also have type definitions
const encrypted: string = encryption('data')
const chunks: any[][] = splitArray([1, 2, 3, 4], 2)
```