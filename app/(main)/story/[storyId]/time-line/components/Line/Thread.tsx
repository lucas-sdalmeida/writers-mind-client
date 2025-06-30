'use client'

import { Quicksand } from 'next/font/google'
import { MouseEvent, useState } from 'react'
import { useKeyDown } from '../../hooks/useKeyDown'
import { useKeyUp } from '../../hooks/useKeyUp'
import { useSelectionContext } from '../../context/SelectionContext'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function Thread({
  lineIndex,
  volumeId,
  characterId,
  lineName,
  color,
}: Readonly<Props>) {
  const narrativeThreadId = volumeId ?? characterId ?? ''

  const [controlPressed, setControlPressed] = useState(false)
  const { selectionState, selectLine, removeLine } = useSelectionContext()

  const isSelected = selectionState.selectedLines.some((l) => {
    return l.narrativeThreadId === narrativeThreadId && l.line === lineIndex
  })

  useKeyDown(['Control'], () => setControlPressed(true))
  useKeyUp(['Control'], () => setControlPressed(false))

  const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) {
      return
    }
    if (isSelected) {
      removeLine(narrativeThreadId, lineIndex)
      return
    }
    selectLine(narrativeThreadId, lineIndex)
  }

  return (
    <div
      className={`w-full py-1 relative z-0 ${controlPressed && 'hover:border-y-[1px] hover:border-y-[#404040]'} ${isSelected && 'border-y-[1px] border-y-emerald-700'}`}
      onClick={handleOnClick}
    >
      <div
        className='w-full h-[.5px] relative z-0'
        style={{ backgroundColor: color }}
      />

      <p
        className={`${quicksand.className} absolute z-10 right-0 -translate-x-1/2 -translate-y-full`}
      >
        {lineName}
      </p>
    </div>
  )
}

type Props = {
  lineIndex: number
  volumeId?: string
  characterId?: string
  lineName: string
  color: string
}
