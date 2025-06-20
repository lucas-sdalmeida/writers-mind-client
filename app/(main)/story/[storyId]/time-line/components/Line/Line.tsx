'use-client'

import { Quicksand } from 'next/font/google'
import { useRouter } from 'next/navigation'

import { Story } from '@/app/(main)/story/api'
import { LineData, TimePoint } from '../../context/time-line'
import { useAddPoint } from '../../hooks/useAddPoint'

import { useState } from 'react'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function Line({ story, lineGroup, line }: Props) {
  const router = useRouter()
  const addPoint = useAddPoint()

  const [lineHover, setLineHover] = useState(false)
  const [newPointPosition, setNewPointPosition] = useState(0)

  const handleNewMark = () => {
    addPoint({ line: line.index, x: newPointPosition, lineGroup })
    router.push(`/story/${story.id}/time-line/fragment`)
  }

  return (
    <div
      className='w-full py-4 relative flex items-center cursor-pointer'
      onMouseOver={() => setLineHover(true)}
      onMouseLeave={() => setLineHover(false)}
      onMouseMove={(e) => setNewPointPosition(e.clientX)}
      onClick={handleNewMark}
    >
      <div
        className='w-full h-[.5px] relative z-0'
        style={{ backgroundColor: line.color }}
      ></div>

      <div
        className={`size-2 rounded-full absolute z-10 ${!lineHover && 'hidden'}`}
        style={{
          backgroundColor: line.color,
          left: `calc(${newPointPosition}px - .25rem)`,
        }}
      ></div>

      {line.points.map((point, index) => (
        <LinePoint
          key={index}
          index={index}
          point={point}
          color={line.color}
        ></LinePoint>
      ))}
    </div>
  )
}

type Props = {
  story: Story
  lineGroup?: string
  line: LineData
}

function LinePoint({
  index,
  point,
  color,
}: {
  index: number
  point: TimePoint
  color: string
}) {
  return (
    <>
      <div
        className='size-2 rounded-full absolute z-20'
        style={{
          backgroundColor: color,
          left: `calc(${point.actualPosition.x}px - .25rem)`,
        }}
      ></div>
      <p
        className={`${quicksand.className} px-2 rounded-md shadow-md bg-white text-xs absolute`}
        style={{
          left: `calc(${point.actualPosition.x}px)`,
          zIndex: `z-${index}`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        {point.title}
      </p>
    </>
  )
}
