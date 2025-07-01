'use client'

import { createContext, RefObject, useContext, useRef, useState } from 'react'

export const SelectionContext = createContext<SelectionContextData | undefined>(
  undefined,
)

type SelectionContextData = {
  selectionState: SelectionContextState
  narrativeThreadOnHover: RefObject<{ threadId: string; title?: string }>
  selectLine: (narrativeThreadId: string, line: number) => void
  removeLine: (narrativeThreadId: string, line: number) => void
  clear: () => void
  startAddingThread: () => void
  stopAddingThread: () => void
}

export type SelectionContextState = {
  addingNarrativeThread: boolean
  selectedLines: { narrativeThreadId: string; line: number }[]
}

export function useSelectionContext() {
  return useContext(SelectionContext)!
}

export default function SelectionContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [selectionState, setSelectionState] = useState({
    addingNarrativeThread: false,
    selectedLines: [],
  } as SelectionContextState)
  const narrativeThreadRef = useRef({ threadId: '' } as {
    threadId: string
    title?: string
  })

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

  const startAddingThread = () =>
    setSelectionState({ ...selectionState, addingNarrativeThread: true })

  const stopAddingThread = () =>
    setSelectionState({ ...selectionState, addingNarrativeThread: false })

  const clear = () =>
    setSelectionState({
      ...selectionState,
      addingNarrativeThread: false,
      selectedLines: [],
    })

  return (
    <SelectionContext.Provider
      value={{
        selectionState,
        narrativeThreadOnHover: narrativeThreadRef,
        selectLine,
        removeLine,
        clear,
        startAddingThread,
        stopAddingThread,
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}
