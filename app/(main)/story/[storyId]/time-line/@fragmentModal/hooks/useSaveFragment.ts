import { TimePoint } from '../../context/time-line'
import { useTimeLineContext } from '../../context/TimeLineContext'

export function useSaveFragment(): SaveFragmentFunction {
  const { timeLine, setTimeLine } = useTimeLineContext()

  return (fragment) => {
    const groups = timeLine.lineGroups.map((group) => {
      if (group.id !== fragment.packId) return group

      const lines = group.lines.map((line) => {
        if (line.index !== fragment.actualPosition.line) return line
        return { ...line, points: [...line.points, fragment] }
      })

      return { ...group, lines }
    })

    const offsetX = timeLine.offsetX ?? fragment.actualPosition.x
    setTimeLine({
      offsetX,
      addingPoint: undefined,
      lineGroups: groups,
    })
  }
}

export type SaveFragmentFunction = (fragment: TimePoint) => void
