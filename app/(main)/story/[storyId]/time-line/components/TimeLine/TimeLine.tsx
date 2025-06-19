'use client'

import { useTimeLineContext } from '../../context/TimeLineContext'
import LineGroup from '../LineGroup'

export default function TimeLine({ story, className }: Readonly<Props>) {
  const { timeLine } = useTimeLineContext()

  return (
    <div className={`${className} flex items-center`}>
      {timeLine.lineGroups.map((group, index) => (
        <LineGroup key={index} story={story} group={group} />
      ))}
    </div>
  )
}

type Props = {
  story: { id: string; title: string }
  className?: string
}
