# Data Processing

Data processing utility functions, including encryption, decryption, and format conversion functions.

## Functions

### encryption

Encrypts a string using a specific algorithm.

```javascript
import { encryption } from 'strap-trousers'

const encrypted = encryption('sensitive data')
console.log(encrypted) // Encrypted string
```

**Parameters:**
- `str` (string): String to be encrypted

**Returns:**
- `string`: Encrypted string

### decrypt

Decrypts an encrypted string.

```javascript
import { decrypt } from 'strap-trousers'

const encrypted = encryption('sensitive data')
const decrypted = decrypt(encrypted)
console.log(decrypted) // 'sensitive data'
```

**Parameters:**
- `str` (string): Encrypted string

**Returns:**
- `string`: Decrypted string

## Usage Examples

### Basic Encryption and Decryption

```javascript
import { encryption, decrypt } from 'strap-trousers'

const originalText = 'Hello World'
const encrypted = encryption(originalText)
const decrypted = decrypt(encrypted)

console.log('Original:', originalText)
console.log('Encrypted:', encrypted)
console.log('Decrypted:', decrypted)
```

### Practical Application

```javascript
import { encryption, decrypt } from 'strap-trousers'

// Encrypt sensitive data before sending
function sendSecureData(data) {
  const encryptedData = encryption(JSON.stringify(data))
  return fetch('/api/secure-endpoint', {
    method: 'POST',
    body: encryptedData
  })
}

// Decrypt received data
function receiveSecureData(encryptedData) {
  const decryptedData = decrypt(encryptedData)
  return JSON.parse(decryptedData)
}
```

## Notes

- The encryption and decryption functions use the built-in [formatString](../format) function for string format conversion
- For detailed format conversion rules, please refer to the [String Processing Tools](../format) documentation
- These functions are suitable for simple data encryption scenarios. For high-security requirements, please use professional encryption libraries