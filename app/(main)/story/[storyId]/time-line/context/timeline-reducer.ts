import type { TimelineDto } from '../api/get-timeline'
import type Timeline from './timeline'

export function timeLineReducer(previous: Timeline, action: Action) {
  return initTimeline(action.timeline)
}

export type Action = InitAction

function initTimeline(timeline: TimelineDto) {
  return { narrativeThreads: timeline.narrativeThreads }
}

export type InitAction = {
  type: 'init'
  timeline: TimelineDto
}
