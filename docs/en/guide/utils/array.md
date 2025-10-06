# Array Operations

Array operation utility functions, providing common array processing functions.

## Functions

### splitArray

Splits an array into chunks of specified size.

```javascript
import { splitArray } from 'strap-trousers'

const arr = [1, 2, 3, 4, 5, 6]
const chunks = splitArray(arr, 2)
console.log(chunks) // [[1, 2], [3, 4], [5, 6]]
```

**Parameters:**
- `arr` (Array): Array to be split
- `size` (number): Size of each chunk

**Returns:**
- `Array[]`: Array of chunks

### arrayFoldFront

Performs folding operation on array elements.

```javascript
import { arrayFoldFront } from 'strap-trousers'

const arr = [1, 2, 3, 4, 5, 6]
const folded = arrayFoldFront(arr, 3)
console.log(folded) // [[1, 4], [2, 5], [3, 6]]
```

**Parameters:**
- `arr` (Array): Array to be folded
- `foldSize` (number): Folding size

**Returns:**
- `Array[]`: Folded array

### arrayFoldBack

Performs reverse folding operation on array elements.

```javascript
import { arrayFoldBack } from 'strap-trousers'

const arr = [1, 2, 3, 4, 5, 6]
const folded = arrayFoldBack(arr, 3)
console.log(folded) // [[4, 1], [5, 2], [6, 3]]
```

**Parameters:**
- `arr` (Array): Array to be folded
- `foldSize` (number): Folding size

**Returns:**
- `Array[]`: Folded array

## Usage Examples

### Splitting Arrays

```javascript
import { splitArray } from 'strap-trousers'

// Split into chunks of 2
const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
const pairs = splitArray(numbers, 2)
console.log(pairs) // [[1, 2], [3, 4], [5, 6], [7, 8]]

// Split into chunks of 3
const triples = splitArray(numbers, 3)
console.log(triples) // [[1, 2, 3], [4, 5, 6], [7, 8]]
```

### Array Folding

```javascript
import { arrayFoldFront, arrayFoldBack } from 'strap-trousers'

const data = ['a', 'b', 'c', 'd', 'e', 'f']

// Front folding
const frontFolded = arrayFoldFront(data, 3)
console.log(frontFolded) // [['a', 'd'], ['b', 'e'], ['c', 'f']]

// Back folding
const backFolded = arrayFoldBack(data, 3)
console.log(backFolded) // [['d', 'a'], ['e', 'b'], ['f', 'c']]
```

### Practical Application

```javascript
import { splitArray } from 'strap-trousers'

// Batch process data
function batchProcess(items, batchSize) {
  const batches = splitArray(items, batchSize)
  
  return batches.map(batch => {
    // Process each batch
    return batch.map(item => processItem(item))
  })
}

function processItem(item) {
  // Process individual item
  return item * 2
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const results = batchProcess(data, 3)
console.log(results) // [[2, 4, 6], [8, 10, 12], [14, 16, 20]]
```

## Notes

- All functions return new arrays without modifying the original array
- The foldSize parameter should be a positive integer
- When the array length is not divisible by the chunk size, the last chunk will contain the remaining elements