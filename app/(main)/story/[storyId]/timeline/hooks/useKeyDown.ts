import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export function useKeyDown(keys: string[], callback: KeyUpCallback) {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const handleKeyDown = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (keys.some((k) => k === event.key)) callbackRef.current(event)
    },
    [keys],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export type KeyUpCallback = (event: globalThis.KeyboardEvent) => void
