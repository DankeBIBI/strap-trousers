# String Processing

String processing utility functions, including format conversion and other string operations.

## Functions

### formatString

Converts string format according to specific rules.

```javascript
import { formatString } from 'strap-trousers'

const result = formatString('Hello')
console.log(result) // Converted string
```

**Parameters:**
- `str` (string): String to be converted

**Returns:**
- `string`: Converted string

**Conversion Rules:**
- Lowercase letters are converted to uppercase double characters in reverse order
- Uppercase letters are converted to lowercase double characters in reverse order
- Provides reverse mapping functionality

## Usage Examples

### Basic Format Conversion

```javascript
import { formatString } from 'strap-trousers'

const original = 'Hello World'
const converted = formatString(original)
const restored = formatString(converted) // Reverse conversion

console.log('Original:', original)
console.log('Converted:', converted)
console.log('Restored:', restored)
```

### Application in Encryption

```javascript
import { formatString } from 'strap-trousers'

// Used in encryption function
function simpleEncrypt(str) {
  return formatString(str)
}

function simpleDecrypt(str) {
  return formatString(str) // Reverse conversion
}

const original = 'sensitive data'
const encrypted = simpleEncrypt(original)
const decrypted = simpleDecrypt(encrypted)

console.log(decrypted === original) // true
```

## Notes

- The formatString function is mainly used internally for encryption and decryption functions
- Provides bidirectional conversion functionality
- Suitable for simple string obfuscation scenarios
- For complex string processing needs, consider using professional string processing libraries