'use client'

import { useEffect } from 'react'

import { DndContext, DragEndEvent } from '@dnd-kit/core'

import type { TimelineDto } from '../../api/get-timeline'
import { useTimelineContext } from '../../context/TimeLineContext'
import NarrativeThread from '../NarrativeThread'
import { Point } from '../../context/timeline'

export default function Timeline({ dto, className }: Readonly<Props>) {
  const { timeline, dispatch } = useTimelineContext()

  useEffect(() => {
    dispatch({ type: 'init', timeline: dto })
  }, [dto, dispatch])

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over) return

    const point = active.data.current as Point
    const overId = over.id as string
    const [volumeId, characterId, line, chapterId] = overId.split('.')
    const deltaX = e.delta.x

    dispatch({
      type: 'move-point',
      point: point,
      destination: {
        volumeId: volumeId === '' ? undefined : volumeId,
        characterId: characterId === '' ? undefined : characterId,
        chapterId: chapterId === '' ? undefined : chapterId,
        line: +line,
        deltaX,
      },
    })
  }

  return (
    <div className={`${className} w-full flex flex-col justify-center gap-16`}>
      <DndContext onDragEnd={handleDragEnd}>
        {timeline.narrativeThreads.map((t, i) => {
          return (
            <NarrativeThread key={i} storyId={timeline.storyId} thread={t} />
          )
        })}
      </DndContext>
    </div>
  )
}

type Props = {
  dto: TimelineDto
  className?: string
}
