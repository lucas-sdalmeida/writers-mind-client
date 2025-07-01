import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export function useKeyUp(keys: string[], callback: KeyUpCallback) {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const handleKeyUp = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (keys.some((k) => k === event.key)) callbackRef.current(event)
    },
    [keys],
  )

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp)
    return () => document.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])
}
export type KeyUpCallback = (event: globalThis.KeyboardEvent) => void
