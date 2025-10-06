# Utility Functions

Strap-Trousers provides a rich set of utility functions covering data processing, array operations, object operations, time processing, and more.

## Function Categories

### Data Processing
- [encryption](../utils/data) - String encryption
- [decrypt](../utils/data) - String decryption
- [formatString](../utils/format) - String format conversion

### Array Operations
- [splitArray](../utils/array) - Split array into chunks
- [arrayFoldFront](../utils/array) - Array folding operation
- [arrayFoldBack](../utils/array) - Array reverse folding

### Object Operations
- [deepClone](../utils/object) - Deep clone object
- [copyValueOfTheSameKey](../utils/object) - Copy values of same keys

### Time Processing
- [splitTime](../utils/time) - Calculate time difference

### ID Generation
- [DKID](../utils/id) - Generate random string ID

## Quick Reference

```javascript
// Import all utility functions
import * as utils from 'strap-trousers'

// Or import on demand
import { encryption, splitArray, deepClone, splitTime } from 'strap-trousers'

// Usage examples
const encrypted = encryption('sensitive data')
const chunks = splitArray([1,2,3,4,5,6], 2)
const cloned = deepClone({ name: 'test' })
const timeDiff = splitTime({ time: '2024-12-31 23:59:59' })
```

## Function Details

Click on the links above to view detailed documentation for each utility function, including usage examples and parameter descriptions.