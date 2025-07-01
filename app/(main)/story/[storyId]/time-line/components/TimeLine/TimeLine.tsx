'use client'

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import { useTimelineContext } from '../../context/TimeLineContext'
import NarrativeThread from '../NarrativeThread'
import { Point } from '../../context/timeline'
import { useEffect } from 'react'
import { patchTimelineThreads } from '../../api/patchTimelineThreads'

export default function Timeline({ className }: Readonly<Props>) {
  const { timeline, dispatch } = useTimelineContext()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  )

  useEffect(() => {
    ;(async () =>
      await patchTimelineThreads(timeline.storyId, timeline.narrativeThreads))()
  }, [timeline])

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
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
  className?: string
}
