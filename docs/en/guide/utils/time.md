# Time Processing

Time processing utility functions, providing time difference calculation and other time-related functions.

## Functions

### splitTime

Calculates time difference from current time to specified time.

```javascript
import { splitTime } from 'strap-trousers'

const timeDiff = splitTime({
  time: '2024-12-31 23:59:59'
})
console.log(timeDiff)
// { year: 0, month: 0, week: 0, day: 1, hour: 2, minute: 30, second: 45 }
```

**Parameters:**
- `options` (Object): Configuration object
  - `time` (string): Target time string (format: 'YYYY-MM-DD HH:mm:ss')

**Returns:**
- `Object`: Time difference object containing year, month, week, day, hour, minute, second

## Usage Examples

### Basic Time Difference Calculation

```javascript
import { splitTime } from 'strap-trousers'

// Calculate time difference from now to New Year
const newYearDiff = splitTime({
  time: '2025-01-01 00:00:00'
})

console.log(`New Year is in ${newYearDiff.day} days, ${newYearDiff.hour} hours, and ${newYearDiff.minute} minutes`)
```

### Countdown Display

```javascript
import { splitTime } from 'strap-trousers'

function formatCountdown(targetTime) {
  const diff = splitTime({ time: targetTime })
  
  const parts = []
  if (diff.day > 0) parts.push(`${diff.day} days`)
  if (diff.hour > 0) parts.push(`${diff.hour} hours`)
  if (diff.minute > 0) parts.push(`${diff.minute} minutes`)
  if (diff.second > 0) parts.push(`${diff.second} seconds`)
  
  return parts.join(', ') || 'Now'
}

const countdown = formatCountdown('2024-12-31 23:59:59')
console.log(countdown) // e.g., "1 days, 2 hours, 30 minutes, 45 seconds"
```

### Practical Application

```javascript
import { splitTime } from 'strap-trousers'

// Check if an event is approaching
function isEventApproaching(eventTime, threshold = { days: 7 }) {
  const diff = splitTime({ time: eventTime })
  
  return diff.day <= threshold.days
}

// Check event status
function getEventStatus(eventTime) {
  const diff = splitTime({ time: eventTime })
  
  if (diff.year < 0 || diff.month < 0 || diff.day < 0) {
    return 'Event has passed'
  } else if (diff.day <= 1) {
    return 'Event is very soon!'
  } else if (diff.day <= 7) {
    return `Event is in ${diff.day} days`
  } else {
    return `Event is in ${diff.day} days, ${diff.hour} hours`
  }
}

const eventTime = '2024-12-31 20:00:00'
console.log(getEventStatus(eventTime))
```

### Time Format Validation

```javascript
import { splitTime } from 'strap-trousers'

function isValidTimeFormat(timeString) {
  try {
    const result = splitTime({ time: timeString })
    // If no error is thrown, the format is valid
    return true
  } catch (error) {
    return false
  }
}

console.log(isValidTimeFormat('2024-12-31 23:59:59')) // true
console.log(isValidTimeFormat('invalid-time')) // false
console.log(isValidTimeFormat('2024-13-45 25:70:80')) // false (invalid date/time)
```

## Notes

- Time format must be 'YYYY-MM-DD HH:mm:ss'
- The function calculates the difference from the current time
- All time units (year, month, week, day, hour, minute, second) are included in the return object
- For complex time processing needs, consider using professional date libraries like dayjs or moment.js