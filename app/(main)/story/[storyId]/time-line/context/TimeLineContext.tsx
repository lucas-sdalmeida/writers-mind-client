'use client'

import {
  ActionDispatch,
  createContext,
  RefObject,
  useContext,
  useReducer,
  useRef,
} from 'react'
import Timeline from './timeline'
import { Action, timeLineReducer } from './timeline-reducer'
import type { TimelineDto } from '../api/get-timeline'

export const TimeLineContext = createContext<TimeLineContextData | undefined>(
  undefined,
)

type TimeLineContextData = {
  timeline: Timeline
  dispatch: ActionDispatch<[action: Action]>
  addingPointData: RefObject<AddingPointData | undefined>
}

type AddingPointData = {
  volumeId?: string
  characterId?: string
  chapterId?: string
  position: { line: number; x: number }
}

export function useTimelineContext() {
  return useContext(TimeLineContext)!
}

export default function TimeLineContextProvider({
  timeline: dto,
  children,
}: Readonly<Props>) {
  const [timeline, dispatch] = useReducer(timeLineReducer, {
    storyId: dto.story.id,
    narrativeThreads: dto.narrativeThreads,
  })
  const addingPointData = useRef<AddingPointData | undefined>(undefined)

  return (
    <TimeLineContext.Provider value={{ timeline, dispatch, addingPointData }}>
      {children}
    </TimeLineContext.Provider>
  )
}

type Props = {
  timeline: TimelineDto
  children: React.ReactNode
}
