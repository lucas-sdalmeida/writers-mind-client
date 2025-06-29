'use client'

import { ActionDispatch, createContext, useContext, useReducer } from 'react'
import Timeline from './time-line'
import { Action, timeLineReducer } from './timeline-reducer'

export const TimeLineContext = createContext<TimeLineContextData | undefined>(
  undefined,
)

type TimeLineContextData = {
  timeline: Timeline
  dispatch: ActionDispatch<[action: Action]>
}

export function useTimelineContext() {
  return useContext(TimeLineContext)!
}

export default function TimeLineContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [timeline, dispatch] = useReducer(timeLineReducer, new Timeline())

  return (
    <TimeLineContext.Provider value={{ timeline, dispatch }}>
      {children}
    </TimeLineContext.Provider>
  )
}
