'use client'

import { Quicksand } from 'next/font/google'

import { memo, MouseEvent, useState } from 'react'

import type { Line } from '../../context/timeline'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

function Line({ line }: Readonly<Props>) {
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
    </div>
  )
}

type Props = {
  line: Line
}

export default memo(Line)
