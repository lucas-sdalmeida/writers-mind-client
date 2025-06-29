import type { Timeline as TimelineMetaData } from '../api/get-timeline'
import Timeline from './timeline'

export function timeLineReducer(previous: Timeline, action: Action) {
  return new Timeline(
    action.timeline.narrativeThreads.map((t) => ({ ...t, lines: [] })),
  )
}

export type Action = {
  type: 'init'
  timeline: TimelineMetaData
}
