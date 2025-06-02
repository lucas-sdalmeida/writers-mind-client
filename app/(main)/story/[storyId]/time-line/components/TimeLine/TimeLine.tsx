'use client'

import { useState } from 'react'
import { useTimeLineContext } from '../../context/TimeLineContext'
import { useRouter } from 'next/navigation'

export default function TimeLine({ story, className }: Readonly<Props>) {
  const router = useRouter()
  const { timeLine } = useTimeLineContext()

  const [lineHover, setLineHover] = useState(undefined as number | undefined)
  const [newPointPosition, setNewPointPosition] = useState(0)

  const handleNewMark = () => {
    router.push(`/story/${story.id}/time-line/fragment`)
  }

  return (
    <div className={`${className} flex items-center`}>
      <div
        className='w-full py-4 relative flex items-center'
        onMouseOver={() => setLineHover(0)}
        onMouseLeave={() => setLineHover(undefined)}
        onMouseMove={(e) => setNewPointPosition(e.clientX)}
        onClick={handleNewMark}
      >
        <div className='w-full h-[.5px] bg-[#10c3e2] relative z-0'></div>

        <div
          className={`w-2 h-2 rounded-full bg-[#10c3e2] absolute z-10 ${lineHover === undefined && 'hidden'}`}
          style={{ left: `calc(${newPointPosition}px - .25rem)` }}
        ></div>

        {timeLine.lines[0].points.map((point, i) => (
          <div
            key={i}
            className='size-2 rounded-full bg-[#10c3e2] absolute z-10'
            style={{ left: `calc(${point.actualPosition}px - .25rem)` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

type Props = {
  story: { id: string; title: string }
  className?: string
}
