'use client'

import { useEffect } from 'react'
import type { TimelineDto } from '../../api/get-timeline'
import { useTimelineContext } from '../../context/TimeLineContext'
import NarrativeThread from '../NarrativeThread'

export default function Timeline({ dto, className }: Readonly<Props>) {
  const { timeline, dispatch } = useTimelineContext()

  useEffect(() => {
    dispatch({ type: 'init', timeline: dto })
  }, [dto, dispatch])

  return (
    <div className={`${className} w-full flex flex-col justify-center gap-8`}>
      {timeline.narrativeThreads.map((t, i) => {
        return <NarrativeThread key={i} thread={t} />
      })}
    </div>
  )
}

type Props = {
  dto: TimelineDto
  className?: string
}
