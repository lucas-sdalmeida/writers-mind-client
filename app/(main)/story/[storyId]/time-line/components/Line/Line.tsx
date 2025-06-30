'use client'

import { Quicksand } from 'next/font/google'

import { memo } from 'react'

import type { Line as LineData } from '../../context/timeline'
import PointCursor from './PointCursor'
import Point from './Point'

import { useDroppable } from '@dnd-kit/core'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

function Line({ storyId, line, volumeId, characterId }: Readonly<Props>) {
  const { setNodeRef } = useDroppable({
    id: `${volumeId ?? ''}.${characterId ?? ''}.${line.index}.`,
  })

  return (
    <div
      ref={setNodeRef}
      className='w-full mb-2 last:mb-0 py-4 flex flex-col justify-center relative group'
    >
      <div className='w-full py-1 relative z-0'>
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

      <PointCursor
        storyId={storyId}
        volumeId={volumeId}
        characterId={characterId}
        lineIndex={line.index}
        color={line.preferences.color}
      />

      {line.points.map((p) => (
        <Point key={p.id} line={line} point={p} offset={350} />
      ))}
    </div>
  )
}

type Props = {
  storyId: string
  volumeId?: string
  characterId?: string
  line: LineData
}

export default memo(Line)
