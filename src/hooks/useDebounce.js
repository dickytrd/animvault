import { useRef, useEffect, useCallback } from 'react'

/**
 * useDebounce
 * ───────────
 * Returns a debounced version of `callback`.
 * Timer is cleared automatically on component unmount to prevent
 * state updates on unmounted components (memory leak / React warning).
 */
export function useDebounce(callback, delay) {
  const timerRef    = useRef(null)
  const callbackRef = useRef(callback)

  // Keep callback ref fresh so debounced fn always calls latest version
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const debouncedFn = useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    },
    [delay]
  )

  return debouncedFn
}
