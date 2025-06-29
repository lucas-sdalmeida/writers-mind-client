import { memo } from 'react'
import { NarrativeThread as NarrativeThreadData } from '../../context/timeline'
import Line from '../Line'

function NarrativeThread({ thread }: Readonly<Props>) {
  return (
    <div className='w-full'>
      {thread.lines.map((l) => (
        <Line key={l.index} line={l} />
      ))}
    </div>
  )
}

type Props = {
  thread: NarrativeThreadData
}

export default memo(NarrativeThread)
