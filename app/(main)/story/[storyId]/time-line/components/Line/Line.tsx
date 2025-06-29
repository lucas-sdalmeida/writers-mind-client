import { Quicksand } from 'next/font/google'

import { memo } from 'react'

import type { Line } from '../../context/timeline'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

function Line({ line }: Readonly<Props>) {
  return (
    <div className='w-full mb-2 last:mb-0 py-4 relative'>
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
  )
}

type Props = {
  line: Line
}

export default memo(Line)
