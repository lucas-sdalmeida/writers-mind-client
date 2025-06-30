import { Quicksand } from 'next/font/google'

import { useDraggable } from '@dnd-kit/core'

import type {
  Line as LineData,
  Point as PointData,
} from '../../context/timeline'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function ExcerptPoint({
  line,
  point,
  offset,
}: Readonly<PointProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: point.id,
    data: point,
  })

  const transformStyle = transform
    ? `translate(-50%, 0%) translate(${transform.x}px, ${transform.y}px)`
    : 'translate(-50%, 0%)'

  return (
    <>
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

      {!point.chapterId && !transform && (
        <p
          className={`${quicksand.className} text-xs px-2 rounded-md shadow-md bg-white absolute z-30 -translate-x-1/2 -translate-y-[150%]`}
          style={{
            left: `calc(${offset}px + 4rem * ${point.actualPosition.x})`,
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
