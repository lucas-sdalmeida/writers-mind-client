'use client'

import { Quicksand } from 'next/font/google'
import { useState } from 'react'
import { useKeyDown } from '../../hooks/useKeyDown'
import { useKeyUp } from '../../hooks/useKeyUp'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function Thread({ lineName, color }: Readonly<Props>) {
  const [controlPressed, setControlPressed] = useState(false)

  useKeyDown(['Control'], () => setControlPressed(true))
  useKeyUp(['Control'], () => setControlPressed(false))

  return (
    <div
      className={`w-full py-1 relative z-0 ${controlPressed && 'hover:border-y-[1px] hover:border-y-[#404040]'}`}
    >
      <div
        className='w-full h-[.5px] relative z-0'
        style={{ backgroundColor: color }}
      />

      <p
        className={`${quicksand.className} absolute z-10 right-0 -translate-x-1/2 -translate-y-full`}
      >
        {lineName}
      </p>
    </div>
  )
}

type Props = {
  lineIndex: number
  volumeId?: string
  characterId?: string
  lineName: string
  color: string
}
