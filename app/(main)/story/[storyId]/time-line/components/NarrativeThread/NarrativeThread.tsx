import { memo } from 'react'
import { NarrativeThread as NarrativeThreadData } from '../../context/timeline'

function NarrativeThread({ thread }: Readonly<Props>) {
  console.log(
    'NarrativeThread: ' +
      (thread.volumeId ?? thread.characterId ?? 'unbounded'),
  )

  return (
    <div className='w-full'>
      {thread.lines.map((l) => (
        <div key={l.index} className='w-full mb-2 last:mb-0 text-center'>
          {l.preferences.name}
        </div>
      ))}
    </div>
  )
}

type Props = {
  thread: NarrativeThreadData
}

export default memo(NarrativeThread)
