import type {
  Line as LineData,
  Point as PointData,
} from '../../context/timeline'
import ExcerptPoint from './ExcerptPoint'
import ChapterPoint from './ChapterPoint'
import { memo } from 'react'

function Point({ line, point, offset }: Readonly<PointProps>) {
  console.log(`Point ${point.id} rendered`)
  if (point.type === 'excerpt')
    return <ExcerptPoint line={line} point={point} offset={offset} />
  return <ChapterPoint line={line} point={point} offset={offset} />
}

type PointProps = {
  line: LineData
  point: PointData
  offset: number
}

export default memo(Point)
