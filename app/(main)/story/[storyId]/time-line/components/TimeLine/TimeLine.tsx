'use client'

import { useEffect } from 'react'
import type { Timeline } from '../../api/get-timeline'
import { useTimelineContext } from '../../context/TimeLineContext'

export default function Timeline({
  timeline: metaData,
  className,
}: Readonly<Props>) {
  const { timeline, dispatch } = useTimelineContext()

  useEffect(() => {
    dispatch({ type: 'init', timeline: metaData })
  })

  return (
    <div className={`${className} flex items-center`}>
      {timeline.narrativeThreads.map((t, i) => {
        return <div key={i}>{t.title ?? 'Thread'}</div>
      })}
    </div>
  )
}

type Props = {
  timeline: Timeline
  className?: string
}
