export default class TimeLine {
  private offset?: number
  lines: Line[] = [{ index: 0, name: 'linha 1', color: '#10c3e2', points: [] }]

  addPoint(lineIndex: number, point: number) {
    this.offset = this.offset ?? point

    this.lines.forEach((l) => {
      if (l.index !== lineIndex) return

      l.points.push({
        absolutePosition: point - this.offset!,
        actualPosition: point,
      })

      return
    })
  }
}

type Line = {
  index: number
  name: string
  color: string
  points: TimePoint[]
}

type TimePoint = {
  absolutePosition: number
  actualPosition: number
}
