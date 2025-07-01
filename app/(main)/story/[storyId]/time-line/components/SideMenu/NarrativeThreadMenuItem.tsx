'use client'

import { Minus, Book } from 'lucide-react'

import { NarrativeThread } from '../../context/timeline'
import { useSelectionContext } from '../../context/SelectionContext'

export default function NarrativeThreadMenuItem({
  narrativeThread,
}: Readonly<Props>) {
  const narrativeThreadId =
    narrativeThread.volumeId ?? narrativeThread.characterId ?? ''

  if (narrativeThreadId === '')
    return <UnboundedThread narrativeThread={narrativeThread} />

  return <VolumeOrBiographyThread narrativeThread={narrativeThread} />
}

type Props = {
  narrativeThread: NarrativeThread
}

function UnboundedThread({ narrativeThread }: Readonly<Props>) {
  const narrativeThreadId =
    narrativeThread.volumeId ?? narrativeThread.characterId ?? ''
  const { selectionState } = useSelectionContext()

  return (
    <>
      {narrativeThread.lines.map((line) => {
        const isSelected = selectionState.selectedLines.some(
          (l) =>
            l.narrativeThreadId === narrativeThreadId && l.line === line.index,
        )

        return (
          <li
            key={line.index}
            className={`w-full mb-2 last:mb-0 ${isSelected && 'rounded-md border-[1px] border-emerald-600 text-emerald-600'}`}
          >
            <span className='flex items-center gap-2 text-xs'>
              <Minus size={14} />
              {line.preferences.name}
            </span>
          </li>
        )
      })}
    </>
  )
}

function VolumeOrBiographyThread({ narrativeThread }: Readonly<Props>) {
  const narrativeThreadId =
    narrativeThread.volumeId ?? narrativeThread.characterId ?? ''
  const { selectionState } = useSelectionContext()

  return (
    <li className='w-full mt-2 mb-2 last:mb-0'>
      <span className='mb-2 flex items-center gap-2 text-xs'>
        <Book size={14} color='#404040' />
        {narrativeThread.title}
      </span>

      <ul className='w-full pl-2'>
        {narrativeThread.lines.map((line) => {
          const isSelected = selectionState.selectedLines.some(
            (l) =>
              l.narrativeThreadId === narrativeThreadId &&
              l.line === line.index,
          )

          return (
            <li
              key={line.index}
              className={`w-full mb-2 last:mb-0 ${isSelected && 'rounded-md border-[1px] border-emerald-600 text-emerald-600'}`}
            >
              <span className='flex items-center gap-2 text-xs'>
                <Minus size={14} />
                {line.preferences.name}
              </span>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
