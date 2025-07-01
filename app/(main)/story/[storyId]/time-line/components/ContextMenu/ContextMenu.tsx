'use client'

import { Quicksand } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useSelectionContext } from '../../context/SelectionContext'
import { useTimelineContext } from '../../context/TimeLineContext'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function ContextMenu() {
  const [coordinate, setCoordinate] = useState(
    undefined as { x: number; y: number } | undefined,
  )

  const { dispatch } = useTimelineContext()
  const { selectionState, narrativeThreadOnHover } = useSelectionContext()

  useEffect(() => {
    const handleContextMenu = (e: globalThis.MouseEvent) => {
      e.preventDefault()
      setCoordinate({ x: e.clientX - 5, y: e.clientY - 5 })
    }

    document.addEventListener('contextmenu', handleContextMenu)

    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [setCoordinate])

  return (
    <div
      className={`${quicksand.className} text-xs rounded-md shadow-md bg-white fixed z-50 flex flex-col ${!coordinate && 'hidden'}`}
      style={{
        left: coordinate && `${coordinate.x}px`,
        top: coordinate && `${coordinate.y}px`,
      }}
      onMouseLeave={() => setCoordinate(undefined)}
    >
      <button
        className='p-2 rounded-md border-none outline-none bg-transparent hover:bg-gray-200 hover:underline'
        onClick={() =>
          dispatch({
            type: 'add-line',
            narrativeThreadId: narrativeThreadOnHover.current.threadId,
          })
        }
      >
        Nova linha{' '}
        {narrativeThreadOnHover.current.title &&
          `à "${narrativeThreadOnHover.current.title}"`}
      </button>

      {selectionState.selectedLines.length > 0 && (
        <button className='p-2 rounded-md border-none outline-none bg-transparent hover:bg-gray-200 hover:underline'>
          + Volume com essas linhas
        </button>
      )}
    </div>
  )
}
