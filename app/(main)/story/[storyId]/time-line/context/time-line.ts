type TimeLine = {
  offsetX?: number
  addingPoint?: { line: number; x: number }
  lineGroups: LineGroupData[]
}

export type LineGroupData = {
  title?: string
  color?: string
  lines: LineData[]
}

export type LineData = {
  index: number
  name: string
  color: string
  points: TimePoint[]
}

export type TimePoint = {
  id: string
  title: string
  type: 'excerpt' | 'chapter'
  summary?: string
  momentDate?: Date
  momentTime?: Date
  excerpts?: TimePoint[]
  actualPosition: { line: number; x: number }
}

export default TimeLine
