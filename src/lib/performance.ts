/**
 * Performance monitoring utilities
 * Only logs in development mode
 */

/**
 * Log performance timing for an operation
 * @param label - Description of the operation
 * @param startTime - Start time from performance.now()
 */
export function logPerformance(label: string, startTime: number): void {
  if (process.env.NODE_ENV === 'development') {
    const endTime = performance.now()
    const duration = endTime - startTime
    const emoji = duration < 100 ? '⚡' : duration < 500 ? '⏱️' : '🐌'
    console.log(`${emoji} ${label}: ${duration.toFixed(2)}ms`)
  }
}

/**
 * Measure and log an async operation's performance
 * @param label - Description of the operation
 * @param operation - Async function to measure
 * @returns The result of the operation
 */
export async function measureAsync<T>(
  label: string,
  operation: () => Promise<T>
): Promise<T> {
  const start = performance.now()
  try {
    const result = await operation()
    logPerformance(label, start)
    return result
  } catch (error) {
    logPerformance(`${label} (FAILED)`, start)
    throw error
  }
}

/**
 * Create a performance timer
 * @returns Object with start() and end() methods
 */
export function createTimer(label: string) {
  let startTime: number

  return {
    start: () => {
      startTime = performance.now()
    },
    end: () => {
      if (startTime) {
        logPerformance(label, startTime)
      }
    },
  }
}

// Usage examples:
//
// 1. Simple timing:
//    const start = performance.now()
//    await someSlowOperation()
//    logPerformance('someSlowOperation', start)
//
// 2. Async measurement:
//    const data = await measureAsync('fetchData', async () => {
//      return await fetch('/api/data')
//    })
//
// 3. Timer object:
//    const timer = createTimer('myOperation')
//    timer.start()
//    doSomething()
//    timer.end()
