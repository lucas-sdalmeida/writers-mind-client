'use client'

import { Minus } from 'lucide-react'

import { LineGroupData } from '../../context/timeline'

export default function LoosePointsGroupItem({ lineGroup }: Props) {
  return (
    <>
      {lineGroup.lines.map((line) => {
        return (
          <li key={line.index} className='w-full mb-2 last:mb-0'>
            <span className='flex items-center gap-2 text-xs'>
              <Minus size={14} color='#404040' />
              {line.name}
            </span>
          </li>
        )
      })}
    </>
  )
}

type Props = {
  lineGroup: LineGroupData
}
