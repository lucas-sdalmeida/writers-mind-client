'use client'

import { createContext, useContext, useState } from 'react'

export const SelectionContext = createContext<SelectionContextData | undefined>(
  undefined,
)

type SelectionContextData = {
  selectionState: SelectionContextState
  selectLine: (narrativeThreadId: string, line: number) => void
  removeLine: (narrativeThreadId: string, line: number) => void
}

export type SelectionContextState = {
  selectedLines: { narrativeThreadId: string; line: number }[]
}

export function useSelectionContext() {
  return useContext(SelectionContext)!
}

export default function SelectionContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [selectionState, setSelectionState] = useState({
    selectedLines: [],
  } as SelectionContextState)

  const selectLine = (narrativeThreadId: string, line: number) => {
    setSelectionState({
      ...selectionState,
      selectedLines: [
        ...selectionState.selectedLines,
        { narrativeThreadId, line },
      ],
    })
  }

  const removeLine = (narrativeThreadId: string, line: number) => {
    setSelectionState({
      ...selectionState,
      selectedLines: selectionState.selectedLines.filter(
        (l) => l.narrativeThreadId !== narrativeThreadId || l.line !== line,
      ),
    })
  }

  return (
    <SelectionContext.Provider
      value={{ selectionState, selectLine, removeLine }}
    >
      {children}
    </SelectionContext.Provider>
  )
}
