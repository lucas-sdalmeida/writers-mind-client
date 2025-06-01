'use client'

import { useState } from 'react'

export default function TimeLine({ className }: Readonly<Props>) {
  const [timeMarks, setTimeMarks] = useState([] as MarkPoint[])
  const [lineHover, setLineHover] = useState(undefined as number | undefined)
  const [newPointPosition, setNewPointPosition] = useState(0)
  const [zeroOffset, setZeroOffset] = useState(0)

  const handleNewMark = () => {
    const offset = !timeMarks.length ? newPointPosition : zeroOffset
    if (!timeMarks.length) setZeroOffset(newPointPosition)

    timeMarks.push({
      absolutePosition: newPointPosition - offset,
      actualPosition: newPointPosition,
    })
    setTimeMarks(timeMarks)
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

        {timeMarks.map((mark, i) => (
          <div
            key={i}
            className='size-2 rounded-full bg-[#10c3e2] absolute z-10'
            style={{ left: `calc(${mark.actualPosition}px - .25rem)` }}
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

type MarkPoint = {
  absolutePosition: number
  actualPosition: number
}
