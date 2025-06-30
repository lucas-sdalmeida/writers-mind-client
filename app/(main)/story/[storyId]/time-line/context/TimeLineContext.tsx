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
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [timeline, dispatch] = useReducer(timeLineReducer, {
    storyId: '',
    narrativeThreads: [],
  })
  const addingPointData = useRef<AddingPointData | undefined>(undefined)

  return (
    <TimeLineContext.Provider value={{ timeline, dispatch, addingPointData }}>
      {children}
    </TimeLineContext.Provider>
  )
}
