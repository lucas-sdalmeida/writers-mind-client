'use client'

import { memo } from 'react'

import type { Line as LineData } from '../../context/timeline'
import PointCursor from './PointCursor'
import Point from './Point'
import Thread from './Thread'

import { useDroppable } from '@dnd-kit/core'

function Line({ storyId, line, volumeId, characterId }: Readonly<Props>) {
  const { setNodeRef } = useDroppable({
    id: `${volumeId ?? ''}.${characterId ?? ''}.${line.index}.`,
  })

  return (
    <div
      ref={setNodeRef}
      className='w-full mb-2 last:mb-0 py-4 flex flex-col justify-center relative group'
    >
      <Thread
        lineIndex={line.index}
        volumeId={volumeId}
        characterId={characterId}
        lineName={line.preferences.name}
        color={line.preferences.color}
      />

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
