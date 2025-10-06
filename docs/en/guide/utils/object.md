# Object Operations

Object operation utility functions, providing common object processing functions.

## Functions

### deepClone

Deep clones an object.

```javascript
import { deepClone } from 'strap-trousers'

const original = { a: 1, b: { c: 2 } }
const cloned = deepClone(original)
cloned.b.c = 3
console.log(original.b.c) // 2 (original unchanged)
```

**Parameters:**
- `obj` (Object): Object to be cloned

**Returns:**
- `Object`: Deep cloned object

### copyValueOfTheSameKey

Copies values of same keys from source object to target object.

```javascript
import { copyValueOfTheSameKey } from 'strap-trousers'

const result = copyValueOfTheSameKey({
  dataSource: { a: 1, b: 2, c: 3 },
  targetSource: { a: 0, b: 0, d: 4 }
})
console.log(result) // { a: 1, b: 2, d: 4 }
```

**Parameters:**
- `dataSource` (Object): Source object containing values
- `targetSource` (Object): Target object to receive values

**Returns:**
- `Object`: New object with copied values

## Usage Examples

### Deep Cloning

```javascript
import { deepClone } from 'strap-trousers'

const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['reading', 'music']
}

const cloned = deepClone(original)

// Modify cloned object
cloned.name = 'Jane'
cloned.address.city = 'Los Angeles'
cloned.hobbies.push('sports')

console.log(original.name) // 'John' (unchanged)
console.log(original.address.city) // 'New York' (unchanged)
console.log(original.hobbies.length) // 2 (unchanged)
```

### Copying Same Key Values

```javascript
import { copyValueOfTheSameKey } from 'strap-trousers'

// Update user data
function updateUserData(existingUser, newData) {
  return copyValueOfTheSameKey({
    dataSource: newData,
    targetSource: existingUser
  })
}

const existingUser = {
  id: 1,
  name: 'John',
  email: 'john@old.com',
  age: 25,
  role: 'user'
}

const newData = {
  name: 'John Doe',
  email: 'john@new.com',
  age: 26,
  status: 'active' // This key doesn't exist in existingUser
}

const updatedUser = updateUserData(existingUser, newData)
console.log(updatedUser)
// {
//   id: 1,
//   name: 'John Doe',
//   email: 'john@new.com',
//   age: 26,
//   role: 'user'
// }
```

### Practical Application

```javascript
import { deepClone, copyValueOfTheSameKey } from 'strap-trousers'

// Form data processing
function processFormData(defaultValues, formData) {
  // First, deep clone default values
  const processedData = deepClone(defaultValues)
  
  // Then copy form data values
  return copyValueOfTheSameKey({
    dataSource: formData,
    targetSource: processedData
  })
}

const defaultFormValues = {
  username: '',
  email: '',
  age: 0,
  preferences: {
    theme: 'light',
    language: 'en'
  }
}

const userInput = {
  username: 'johndoe',
  email: 'john@example.com',
  age: 30,
  preferences: {
    theme: 'dark'
  },
  extraField: 'ignored' // This will be ignored
}

const finalData = processFormData(defaultFormValues, userInput)
console.log(finalData)
// {
//   username: 'johndoe',
//   email: 'john@example.com',
//   age: 30,
//   preferences: {
//     theme: 'dark',
//     language: 'en'
//   }
// }
```

## Notes

- The deepClone function performs a complete deep copy, including nested objects and arrays
- The copyValueOfTheSameKey function only copies values of keys that exist in both objects
- Both functions return new objects without modifying the original objects
- For complex object operations, consider using professional object processing libraries like Lodash