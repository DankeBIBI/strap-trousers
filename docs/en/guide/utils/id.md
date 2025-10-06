# ID Generation

ID generation utility functions, providing random string generation functionality.

## Functions

### DKID

Generates a random string ID according to specified rules.

```javascript
import { DKID } from 'strap-trousers'

// Generate default ID
const id = DKID()
console.log(id) // e.g., "abc123def456"

// Generate ID with custom parameters
const customId = DKID({
  length: 16,
  prefix: 'user_',
  suffix: '_2024',
  type: 'mixed' // 'number', 'letter', 'mixed'
})
console.log(customId) // e.g., "user_xyz789abc123_2024"
```

**Parameters:**
- `options` (Object, optional): Configuration object
  - `length` (number): Length of the random string part (default: varies by type)
  - `prefix` (string): Prefix string (default: '')
  - `suffix` (string): Suffix string (default: '')
  - `type` (string): Character type - 'number', 'letter', 'mixed' (default: 'mixed')

**Returns:**
- `string`: Generated ID string

## Usage Examples

### Basic ID Generation

```javascript
import { DKID } from 'strap-trousers'

// Generate default ID
const id1 = DKID()
console.log(id1) // Random string like "abc123def456"

// Generate number-only ID
const numberId = DKID({ type: 'number' })
console.log(numberId) // e.g., "123456789"

// Generate letter-only ID
const letterId = DKID({ type: 'letter' })
console.log(letterId) // e.g., "abcdefghi"
```

### Custom ID Format

```javascript
import { DKID } from 'strap-trousers'

// User ID
const userId = DKID({
  prefix: 'user_',
  length: 8,
  type: 'mixed'
})
console.log(userId) // e.g., "user_abc12345"

// Order ID with timestamp
const orderId = DKID({
  prefix: 'ORD',
  suffix: Date.now().toString().slice(-6),
  length: 6,
  type: 'number'
})
console.log(orderId) // e.g., "ORD123456789012"

// Product SKU
const sku = DKID({
  prefix: 'SKU-',
  length: 10,
  type: 'mixed'
})
console.log(sku) // e.g., "SKU-abc123def4"
```

### Batch ID Generation

```javascript
import { DKID } from 'strap-trousers'

// Generate multiple unique IDs
function generateIds(count, options = {}) {
  const ids = new Set()
  
  while (ids.size < count) {
    const id = DKID(options)
    ids.add(id)
  }
  
  return Array.from(ids)
}

// Generate 5 user IDs
const userIds = generateIds(5, {
  prefix: 'user_',
  length: 6,
  type: 'mixed'
})
console.log(userIds)
// ["user_abc123", "user_def456", "user_ghi789", "user_jkl012", "user_mno345"]
```

### Practical Application

```javascript
import { DKID } from 'strap-trousers'

// Session ID generator
function generateSessionId() {
  return DKID({
    prefix: 'session_',
    length: 16,
    type: 'mixed'
  })
}

// Transaction ID generator
function generateTransactionId() {
  return DKID({
    prefix: 'TXN',
    suffix: Date.now().toString(36).toUpperCase(),
    length: 8,
    type: 'number'
  })
}

// Short code generator for sharing
function generateShareCode() {
  return DKID({
    length: 6,
    type: 'mixed'
  }).toUpperCase()
}

// Usage
const sessionId = generateSessionId()
const transactionId = generateTransactionId()
const shareCode = generateShareCode()

console.log('Session ID:', sessionId)
console.log('Transaction ID:', transactionId)
console.log('Share Code:', shareCode)
```

## Notes

- The function generates cryptographically strong random strings
- Default length varies by type: number (9), letter (9), mixed (12)
- Prefix and suffix are not included in the length calculation
- For high-security ID generation requirements, consider using specialized ID generation libraries like uuid or nanoid