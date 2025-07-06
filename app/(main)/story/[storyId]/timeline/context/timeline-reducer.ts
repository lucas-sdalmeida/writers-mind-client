import type Timeline from './timeline'
import { Line, NarrativeThread, Point } from './timeline'

export function timeLineReducer(previous: Timeline, action: Action) {
  if (action.type === 'move-point') return movePoint(previous, action)
  if (action.type === 'add-point') return addPoint(previous, action)
  if (action.type === 'add-line') return addLine(previous, action)
  return addNarrativeThread(previous, action)
}

export type Action =
  | MovePointAction
  | AddPointAction
  | AddLineAction
  | NewNarrativeThreadAction

function movePoint(previous: Timeline, { movedPoints }: MovePointAction) {
  const narrativeThreads = previous.narrativeThreads.map((t) => {
    const lines = t.lines.map((l) => {
      const points = l.points.filter((p) => !movedPoints[p.id])
      const addingPoints = Object.values(movedPoints).filter(
        (p) => p.actualPosition.line == l.index,
      )
      return { ...l, points: [...points, ...addingPoints] }
    })

    const newLines = {} as { [index: number]: Line }

    Object.values(movedPoints)
      .filter((p) => p.actualPosition.line >= lines.length)
      .forEach((p) => {
        if (newLines[p.actualPosition.line]) {
          const l = newLines[p.actualPosition.line]
          newLines[p.actualPosition.line] = { ...l, points: [...l.points, p] }
          return
        }

        newLines[p.actualPosition.line] = {
          index: p.actualPosition.line,
          preferences: {
            name: `linha ${p.actualPosition.line + 1}`,
            color: generateRandomHexColor(),
          },
          points: [p],
        }
      })

    const newLinesArray = Object.values(newLines).sort(
      (a, b) => a.index - b.index,
    )

    return {
      ...t,
      lines: newLinesArray.length === 0 ? lines : [...lines, ...newLinesArray],
    }
  })
  return { ...previous, narrativeThreads } as Timeline
}

export type MovePointAction = {
  type: 'move-point'
  movedPoints: { [id: string]: Point }
}

function addPoint(previous: Timeline, { point, chapterPoint }: AddPointAction) {
  const destinationThread = point.volumeId ?? point.characterId ?? ''

  const narrativeThreads = previous.narrativeThreads.map((t) => {
    const threadId = t.volumeId ?? t.characterId ?? ''
    if (threadId !== destinationThread) return t

    const lines = t.lines.map((l) => {
      if (l.index !== point.actualPosition.line) return l

      const points = [] as Point[]
      let addingPoint = point

      for (const p of l.points) {
        if (p.id === point.id) {
          addingPoint = { ...point, actualPosition: p.actualPosition }
          continue
        }
        points.push(p)
      }

      return {
        ...l,
        points: chapterPoint
          ? [...points, addingPoint, chapterPoint]
          : [...points, addingPoint],
      }
    })

    return {
      ...t,
      lines:
        point.actualPosition.line < lines.length
          ? lines
          : [
              ...lines,
              {
                index: point.actualPosition.line,
                preferences: {
                  name: `linha ${point.actualPosition.line + 1}`,
                  color: generateRandomHexColor(),
                },
                points: chapterPoint ? [point, chapterPoint] : [point],
              },
            ],
    }
  })

  return { ...previous, narrativeThreads } as Timeline
}

export type AddPointAction = {
  type: 'add-point'
  point: Point
  chapterPoint?: Point
}

function addLine(previous: Timeline, { narrativeThreadId }: AddLineAction) {
  const narrativeThreads = previous.narrativeThreads.map((t) => {
    const threadId = t.volumeId ?? t.characterId ?? ''
    if (threadId !== narrativeThreadId) return t

    const line = {
      index: t.lines.length,
      preferences: {
        name: `linha ${t.lines.length + 1}`,
        color: generateRandomHexColor(),
      },
      points: [],
    } as Line
    const lines = [...t.lines, line]

    return { ...t, lines }
  })

  return { ...previous, narrativeThreads } as Timeline
}

function generateRandomHexColor() {
  const hexCharacters = '0123456789abcdef'
  let hexColorRep = '#'

  for (let index = 0; index < 6; index++) {
    const randomPosition = Math.floor(Math.random() * hexCharacters.length)
    hexColorRep += hexCharacters[randomPosition]
  }

  return hexColorRep
}

export type AddLineAction = {
  type: 'add-line'
  narrativeThreadId?: string
}

function addNarrativeThread(
  previous: Timeline,
  { title, lines: linesIndexes }: NewNarrativeThreadAction,
) {
  const sourceLines = [] as Line[]

  const narrativeThreads = previous.narrativeThreads.map((t) => {
    const threadId = t.volumeId ?? t.characterId ?? ''
    if (threadId !== '') return t

    const lines = [] as Line[]

    for (const line of t.lines) {
      if (linesIndexes.some((i) => i === line.index)) {
        sourceLines.push(line)
        continue
      }
      lines.push(line)
    }

    const defaultLine = {
      index: 0,
      preferences: { name: 'linha 1', color: '#10c3e2' },
      points: [],
    }

    return {
      ...t,
      lines: lines.length > 0 ? lines : [defaultLine],
    }
  })

  const id = ('' + Math.random() * 1000).replace('.', '-')
  const newThread = {
    volumeId: id,
    title,
    lines: sourceLines.map((l, i) => {
      const points = l.points.map((p) => {
        return {
          ...p,
          volumeId: id,
          actualPosition: { ...p.actualPosition, line: i },
        }
      })
      return {
        ...l,
        index: i,
        preferences: {
          name: `linha ${i + 1}`,
          color: generateRandomHexColor(),
        },
        points,
      }
    }),
  } as NarrativeThread

  return {
    ...previous,
    narrativeThreads: [...narrativeThreads, newThread],
  } as Timeline
}

export type NewNarrativeThreadAction = {
  type: 'new-narrative-thread'
  title: string
  lines: number[]
}
