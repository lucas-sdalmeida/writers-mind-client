'use client'

import { createContext, useContext, useState } from 'react'
import TimeLine from './time-line'

export const TimeLineContext = createContext<TimeLineContextData | undefined>(
  undefined,
)

type TimeLineContextData = {
  timeLine: TimeLine
  setTimeLine: (value: TimeLine) => void
}

export function useTimeLineContext() {
  return useContext(TimeLineContext)!
}

export default function TimeLineContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const looseLineGroup = {
    lines: [{ index: 0, name: 'line 1', color: '#10c3e2', points: [] }],
  }

  const [value, setValue] = useState<TimeLine>({
    lineGroups: [looseLineGroup],
  })
  const setTimeLine = (value: TimeLine) => setValue(value)

  return (
    <TimeLineContext.Provider value={{ timeLine: value, setTimeLine }}>
      {children}
    </TimeLineContext.Provider>
  )
}
