# Introduction

Strap-Trousers is a JavaScript library focused on simplifying API request encapsulation, providing multiple encapsulation methods and rich utility functions.

## Core Features

### 🚀 Multiple Encapsulation Methods
- **StrawPlus**: Uses decorator syntax for cleaner and more elegant code
- **StrawApi**: Functional programming with better TypeScript support  
- **EaseApi**: Traditional class-based encapsulation (deprecated, use StrawApi instead)

### 🔧 Rich Utility Functions
- Data processing: encryption, decryption, format conversion
- Array operations: splitting, folding, reorganization
- Object operations: deep cloning, key-value comparison
- Time processing: time difference calculation, formatting
- ID generation: random string generation

### 📱 Cross-platform Support
- Browser environment support
- Node.js environment support
- Built-in mini-program adapters (WeChat, uni-app)

### ⚡ Advanced Features
- Request debouncing
- Cache pool management
- Dynamic request headers
- Interceptor support

## Why Choose Strap-Trousers?

1. **Simple and Easy to Use**: Complete interface encapsulation with minimal configuration of rootUrl and apiList
2. **Type Safety**: Complete TypeScript type definitions
3. **Performance Optimization**: Built-in optimization mechanisms like debouncing and caching
4. **Strong Extensibility**: Support for custom interceptors, adapters, etc.
5. **Comprehensive Documentation**: Detailed usage documentation and examples

## Applicable Scenarios

- Rapid prototyping development
- Enterprise-level applications
- Mini-program development
- Node.js backend services
- Any scenario requiring API encapsulation

## Quick Start

```javascript
// Import all utility functions
import * as utils from 'strap-trousers'

// Or import on demand
import { encryption, splitArray, deepClone, splitTime } from 'strap-trousers'

// Usage examples
const encryptedData = encryption('sensitive data')
const chunks = splitArray([1,2,3,4,5,6], 2)
const clonedObj = deepClone({ name: 'test' })
const timeDiff = splitTime({ time: '2024-12-31 23:59:59' })
```

## Next Steps

- [Installation](./installation) - Learn how to install Strap-Trousers
- [Quick Start](./getting-started) - Get started quickly
- [API Reference](../api/) - View detailed API documentation