'use client'

import type { Timeline } from '../../api/get-timeline'

export default function Timeline({ className }: Readonly<Props>) {
  return <div className={`${className} flex items-center`}></div>
}

type Props = {
  timeline: Timeline
  className?: string
}
