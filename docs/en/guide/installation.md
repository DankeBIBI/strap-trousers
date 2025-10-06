# Installation

Strap-Trousers supports multiple installation methods. You can choose the appropriate way to install based on your project needs.

## npm Installation (Recommended)

```bash
npm install strap-trousers
```

## yarn Installation

```bash
yarn add strap-trousers
```

## pnpm Installation

```bash
pnpm add strap-trousers
```

## CDN Usage

### jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/strap-trousers@latest/dist/strap-trousers.min.js"></script>
```

### unpkg CDN

```html
<script src="https://unpkg.com/strap-trousers@latest/dist/strap-trousers.min.js"></script>
```

## Environment Requirements

### Browser Environment

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)

### Node.js Environment

- Node.js 12.0.0 or higher

### Mini-program Environment

- WeChat Mini Program
- uni-app
- Other mini-program platforms that support ES6

## TypeScript Support

Strap-Trousers includes complete TypeScript type definitions. No need to install additional type packages.

```typescript
import { connectStraw, encryption, splitArray } from 'strap-trousers'

// TypeScript will automatically provide type hints
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
```

## Verification Installation

After installation, you can verify if it was successful:

```javascript
import { version } from 'strap-trousers'

console.log('Strap-Trousers version:', version)
```

## Next Steps

- [Quick Start](./getting-started) - Learn how to use Strap-Trousers quickly
- [StrawApi Guide](./straw-api) - Learn about functional API encapsulation
- [StrawPlus Guide](./straw-plus) - Learn about decorator-based API encapsulation