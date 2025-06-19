import { Story } from '@/app/(main)/story/api'
import { LineData, LineGroupData } from '../../context/time-line'
import Line from '../Line/Line'

export default function LineGroup({ story, group }: Props) {
  const compareLines = (a: LineData, b: LineData) =>
    Math.min(Math.max(a.index - b.index, -1), 1)

  return (
    <div className='w-full'>
      {group.lines.sort(compareLines).map((line) => (
        <Line key={line.index} story={story} line={line} />
      ))}
    </div>
  )
}

type Props = {
  story: Story
  group: LineGroupData
}
