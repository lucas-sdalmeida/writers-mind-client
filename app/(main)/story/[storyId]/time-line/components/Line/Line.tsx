'use client'

import { Quicksand } from 'next/font/google'

import { memo, MouseEvent, useState } from 'react'

import type {
  Line as LineData,
  Point as PointData,
} from '../../context/timeline'
import { useTimelineContext } from '../../context/TimeLineContext'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

function Line({ line }: Readonly<Props>) {
  const { timeline } = useTimelineContext()
  const [newPointPosition, setNewPointPosition] = useState(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setNewPointPosition(e.clientX)
  }

  return (
    <div
      className='w-full mb-2 last:mb-0 py-4 relative group'
      onMouseMove={handleMouseMove}
    >
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

      <div
        className='size-2 rounded-full absolute z-10 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block'
        style={{
          backgroundColor: line.preferences.color,
          left: newPointPosition,
        }}
      ></div>

      {line.points.map((p) => (
        <Point
          key={p.id}
          line={line}
          point={p}
          offset={timeline.offset ?? 350}
        />
      ))}
    </div>
  )
}

type Props = {
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
  return (
    <div
      className='size-2 rounded-full absolute z-30 -translate-x-1/2 -translate-y-1/2'
      style={{
        backgroundColor: line.preferences.color,
        left: `calc(${offset}px + 4rem * ${point.actualPosition.x})`,
      }}
    ></div>
  )
}

function ChapterPoint({ line, point, offset }: Readonly<PointProps>) {
  return (
    <div
      className='h-4 rounded-md absolute z-20 -translate-y-1/2'
      style={{
        width: `calc(4rem * ${point.actualPosition.width ?? 1})`,
        background: `linear-gradient(90deg, ${line.preferences.color} 0%, transparent 7%, transparent 93%, ${line.preferences.color} 100%)`,
        left: `calc(${offset}px + 4rem * ${point.actualPosition.x})`,
      }}
    ></div>
  )
}

type PointProps = {
  line: LineData
  point: PointData
  offset: number
}

export default memo(Line)
