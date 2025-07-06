'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useTimelineContext } from '../../context/TimeLineContext'
import { useUnitsInPx } from '../../hooks/useUnitsInPx'
import { useKeyDown } from '../../hooks/useKeyDown'
import { useKeyUp } from '../../hooks/useKeyUp'

export default function PointCursor({
  storyId,
  narrativeThreadId,
  volumeId,
  characterId,
  lineIndex,
  color,
}: Readonly<Props>) {
  const router = useRouter()
  const unitsInPx = useUnitsInPx()
  const elementRef = useRef(null as HTMLDivElement | null)

  const [newPointPosition, setNewPointPosition] = useState(0)
  const [controlPressed, setControlPressed] = useState(false)
  const { addingPointData } = useTimelineContext()

  useKeyDown(['Control'], () => setControlPressed(true))
  useKeyUp(['Control'], () => setControlPressed(false))

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      setNewPointPosition(e.clientX)
    },
    [setNewPointPosition],
  )

  const handleNewPoint = () => {
    addingPointData.current = {
      narrativeThreadId: narrativeThreadId,
      volumeId,
      characterId,
      position: { line: lineIndex, x: (newPointPosition - 350) / unitsInPx },
    }

    router.push(`/story/${storyId}/timeline/fragment`)
  }

  useEffect(() => {
    if (!elementRef.current) return () => {}

    const parent = elementRef.current.parentElement!
    parent.addEventListener('mousemove', handleMouseMove)

    return () => parent.removeEventListener('mousemove', handleMouseMove)
  }, [elementRef, handleMouseMove])

  return (
    <div
      ref={elementRef}
      className={`size-2 rounded-full absolute z-10 -translate-x-1/2 hidden ${!controlPressed && 'group-hover:block'}`}
      style={{
        backgroundColor: color,
        left: newPointPosition,
      }}
      onClick={handleNewPoint}
    ></div>
  )
}

type Props = {
  storyId: string
  volumeId?: string
  narrativeThreadId?: string
  characterId?: string
  lineIndex: number
  color: string
  className?: string
}
