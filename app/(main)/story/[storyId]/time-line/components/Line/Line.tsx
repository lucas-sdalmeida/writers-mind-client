'use-client'

import { Story } from '@/app/(main)/story/api'
import { LineData } from '../../context/time-line'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAddPoint } from '../../hooks/useAddPoint'

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
      className='w-full py-4 relative flex items-center'
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
        className={`size-2 rounded-full absolute z-20 ${!lineHover && 'hidden'}`}
        style={{
          backgroundColor: line.color,
          left: `calc(${newPointPosition}px - .25rem)`,
        }}
      ></div>

      {line.points.map((point, index) => (
        <div
          key={index}
          className='size-2 rounded-full absolute z-10'
          style={{
            backgroundColor: line.color,
            left: `calc(${point.actualPosition.x}px - .25rem)`,
          }}
        ></div>
      ))}
    </div>
  )
}

type Props = {
  story: Story
  lineGroup?: string
  line: LineData
}
