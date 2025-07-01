'use client'

import { Quicksand } from 'next/font/google'

import { memo } from 'react'

import { NarrativeThread as NarrativeThreadData } from '../../context/timeline'
import Line from '../Line'
import { useSelectionContext } from '../../context/SelectionContext'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

function NarrativeThread({ storyId, thread }: Readonly<Props>) {
  const threadId = thread.volumeId ?? thread.characterId ?? ''
  const { narrativeThreadOnHover } = useSelectionContext()

  return (
    <div
      className='w-full relative flex flex-col justify-center'
      onMouseOver={() =>
        (narrativeThreadOnHover.current = { threadId, title: thread.title })
      }
    >
      {thread.lines.map((l) => (
        <Line
          storyId={storyId}
          key={l.index}
          volumeId={thread.volumeId}
          characterId={thread.characterId}
          line={l}
        />
      ))}

      {thread.title && (
        <div
          className={`${quicksand.className} px-2 rounded-lg shadow-[0px_0px_2px_2px_#9f10e2] bg-[#9f10e2] text-white absolute left-[250px] -rotate-90`}
        >
          {thread.title}
        </div>
      )}
    </div>
  )
}

type Props = {
  storyId: string
  thread: NarrativeThreadData
}

export default memo(NarrativeThread)
