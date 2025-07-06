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
import { useUnitsInPx } from '../../hooks/useUnitsInPx'
import { moveFragment } from '../../api/moveFragment'
import { useAuthorId } from '@/app/(main)/story/hooks/useAuthorId'
import { moveFragmentToChapter } from '../../api/moveFragmentToChapter'

export default function Timeline({ className }: Readonly<Props>) {
  const authorId = useAuthorId()
  const unitsInPx = useUnitsInPx()

  const { timeline, dispatch } = useTimelineContext()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  )

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over) return

    const point = active.data.current as Point
    const overId = over.id as string
    const [threadId, volumeId, characterId, line, chapterId] = overId.split('.')
    const deltaX = e.delta.x

    const handleMovePoint = async () => {
      const request = {
        narrativeThreadId:
          threadId === '' || threadId === 'null' ? undefined : threadId,
        line: +line,
        deltaX: deltaX / unitsInPx,
      }
      const { movedFragments } =
        chapterId === '' || chapterId === 'null'
          ? await moveFragment(authorId!, timeline.storyId, point.id, request)
          : await moveFragmentToChapter(
              authorId!,
              timeline.storyId,
              point.id,
              chapterId,
              request,
            )

      dispatch({
        type: 'move-point',
        movedPoints: movedFragments,
      })
    }

    handleMovePoint()
  }

  return (
    <div className={`${className} w-full flex flex-col justify-center gap-16`}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {timeline.narrativeThreads.map((t) => {
          return (
            <NarrativeThread key={t.id} storyId={timeline.storyId} thread={t} />
          )
        })}
      </DndContext>
    </div>
  )
}

type Props = {
  className?: string
}
