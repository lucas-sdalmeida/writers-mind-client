'use client'

import { Quicksand } from 'next/font/google'

import { memo } from 'react'

import type {
  Line as LineData,
  Point as PointData,
} from '../../context/timeline'
import PointCursor from './PointCursor'

import { useDraggable, useDroppable } from '@dnd-kit/core'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

function Line({ storyId, line, volumeId, characterId }: Readonly<Props>) {
  const { setNodeRef } = useDroppable({
    id: `${volumeId ?? ''}.${characterId ?? ''}.${line.index}.`,
  })

  return (
    <div ref={setNodeRef} className='w-full mb-2 last:mb-0 py-4 relative group'>
      <div className='w-full relative z-0'>
        <div
          className='w-full h-[.5px] relative z-0'
          style={{ backgroundColor: line.preferences.color }}
        />

        <p
          className={`${quicksand.className} absolute z-10 right-0 -translate-x-1/2 -translate-y-full`}
        >
          {line.preferences.name}
        </p>
      </div>

      <PointCursor
        storyId={storyId}
        volumeId={volumeId}
        characterId={characterId}
        lineIndex={line.index}
        color={line.preferences.color}
      />

      {line.points.map((p) => (
        <Point key={p.id} line={line} point={p} offset={350} />
      ))}
    </div>
  )
}

type Props = {
  storyId: string
  volumeId?: string
  characterId?: string
  line: LineData
}

function Point({ line, point, offset }: Readonly<PointProps>) {
  const titlePosition =
    point.type === 'excerpt'
      ? `calc(${offset}px + 4rem * ${point.actualPosition.x})`
      : `calc(${offset}px + 4rem * ${point.actualPosition.x} + 2rem * ${point.actualPosition.width ?? 1})`

  return (
    <>
      {point.type === 'excerpt' ? (
        <ExcerptPoint line={line} point={point} offset={offset} />
      ) : (
        <ChapterPoint line={line} point={point} offset={offset} />
      )}

      {!point.chapterId && (
        <p
          className={`${quicksand.className} text-xs px-2 rounded-md shadow-md bg-white absolute z-30 -translate-x-1/2 -translate-y-[150%]`}
          style={{
            left: titlePosition,
          }}
        >
          {point.title}
        </p>
      )}
    </>
  )
}

function ExcerptPoint({ line, point, offset }: Readonly<PointProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: point.id,
    data: point,
  })

  const transformStyle = transform
    ? `translate(-50%, -50%) translate(${transform.x}px, ${transform.y}px)`
    : 'translate(-50%, -50%)'

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className='size-2 rounded-full absolute z-30'
      style={{
        backgroundColor: line.preferences.color,
        left: `calc(${offset}px + 4rem * ${point.actualPosition.x})`,
        transform: transformStyle,
      }}
    ></div>
  )
}

function ChapterPoint({ line, point, offset }: Readonly<PointProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: point.id,
    data: point,
  })
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `${point.volumeId ?? ''}.${point.characterId ?? ''}.${line.index}.${point.id}`,
  })

  const transformStyle = transform
    ? `translate(0%, -50%) translate(${transform.x}px, ${transform.y}px)`
    : 'translate(0%, -50%)'

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className='h-4 rounded-md absolute z-20'
      style={{
        width: `calc(4rem * ${point.actualPosition.width ?? 1})`,
        background: `linear-gradient(90deg, ${line.preferences.color} 0%, transparent 7%, transparent 93%, ${line.preferences.color} 100%)`,
        left: `calc(${offset}px + 4rem * ${point.actualPosition.x})`,
        transform: transformStyle,
      }}
    >
      <div ref={setDroppableRef} className='w-full h-full'></div>
    </div>
  )
}

type PointProps = {
  line: LineData
  point: PointData
  offset: number
}

export default memo(Line)
