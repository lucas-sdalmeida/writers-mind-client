import { useTimeLineContext } from '../context/TimeLineContext'

export function useAddLine(): AddLineFunction {
  const { timeLine, setTimeLine } = useTimeLineContext()

  return (group) => {
    const lineGroups = timeLine.lineGroups.map((g) => {
      if (g.id !== group) return g

      const lineIndex = g.lines.length
      const lines = [
        ...g.lines,
        {
          index: lineIndex,
          name: `linha ${lineIndex + 1}`,
          color: getLineColor(group),
          points: [],
        },
      ]

      return { ...g, lines }
    })

    setTimeLine({ ...timeLine, lineGroups })
  }
}

function getLineColor(group?: string) {
  if (!group) return '#10c3e2'
  return '#e21010'
}

export type AddLineFunction = (group?: string) => void
