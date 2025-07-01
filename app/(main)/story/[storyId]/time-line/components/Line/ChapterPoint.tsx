'use client'

import { Quicksand } from 'next/font/google'

import { useDraggable, useDroppable } from '@dnd-kit/core'

import type {
  Line as LineData,
  Point as PointData,
} from '../../context/timeline'
import { useTimelineContext } from '../../context/TimeLineContext'
import { useUnitsInPx } from '../../hooks/useUnitsInPx'
import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function ChapterPoint({
  line,
  point,
  offset,
}: Readonly<PointProps>) {
  const router = useRouter()
  const unitInPx = useUnitsInPx()

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: point.id,
    data: point,
  })
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `${point.volumeId ?? ''}.${point.characterId ?? ''}.${line.index}.${point.id}`,
  })
  const { addingPointData } = useTimelineContext()

  const transformStyle =
    transform && `translate(${transform.x}px, ${transform.y}px)`

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    if (transform) return

    addingPointData.current = {
      volumeId: point.volumeId,
      characterId: point.characterId,
      chapterId: point.chapterId,
      position: {
        line: point.actualPosition.line,
        x: (e.clientX - 350) / unitInPx,
      },
    }

    router.push(`/story/undefined/time-line/chapter/${point.id}/fragment`)
  }

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className='h-4 rounded-md absolute z-20'
        style={{
          width: `calc(4rem * ${point.actualPosition.width ?? 1})`,
          background: `linear-gradient(90deg, ${line.preferences.color} 0%, transparent 7%, transparent 93%, ${line.preferences.color} 100%)`,
          left: `calc(${offset}px + 4rem * ${point.actualPosition.x})`,
          transform: transformStyle ?? undefined,
        }}
        onMouseUp={handleOnClick}
      >
        <div ref={setDroppableRef} className='w-full h-full'></div>
      </div>

      {!transform && (
        <p
          className={`${quicksand.className} text-xs px-2 rounded-md shadow-md bg-white absolute z-30 -translate-x-1/2 -translate-y-[150%]`}
          style={{
            left: `calc(${offset}px + 4rem * ${point.actualPosition.x} + 2rem * ${point.actualPosition.width ?? 1})`,
          }}
        >
          {point.title}
        </p>
      )}
    </>
  )
}

type PointProps = {
  line: LineData
  point: PointData
  offset: number
}
