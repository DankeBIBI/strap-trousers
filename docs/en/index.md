# Strap-Trousers

A JavaScript library focused on simplifying API request encapsulation, providing multiple encapsulation methods and rich utility functions.

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

```bash
npm install strap-trousers
```

```javascript
import { connectStraw } from 'strap-trousers'

const api = connectStraw({
  config: {
    lib: axios,
    name: 'myApi',
    rootUrl: 'https://api.example.com'
  },
  action: {
    getUser: () => ({
      url: '/user',
      method: 'GET'
    })
  }
})

// Use
const user = await api.getUser()
```

## Next Steps

- [Installation Guide](./guide/installation) - Learn how to install Strap-Trousers
- [Quick Start](./guide/getting-started) - Get started quickly
- [API Reference](./api/) - View detailed API documentation