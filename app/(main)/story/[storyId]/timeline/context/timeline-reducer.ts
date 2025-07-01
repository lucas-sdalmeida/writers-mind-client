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

function movePoint(previous: Timeline, action: MovePointAction) {
  const narrativeThreads = mapNarrativeThreads(
    previous.narrativeThreads,
    action,
  )
  return { ...previous, narrativeThreads }
}

function mapNarrativeThreads(
  threads: NarrativeThread[],
  { point, destination }: MovePointAction,
): NarrativeThread[] {
  const unitsInPx =
    4 * parseFloat(getComputedStyle(document.documentElement).fontSize)
  const pointThreadId = point.volumeId ?? point.characterId ?? ''
  const destinationThreadId =
    destination.volumeId ?? destination.characterId ?? ''

  const x = point.actualPosition.x + destination.deltaX / unitsInPx
  const updatedPoint = {
    ...point,
    volumeId: destination.volumeId,
    characterId: destination.characterId,
    chapterId: destination.chapterId,
    actualPosition: { ...point.actualPosition, line: destination.line, x },
  } as Point

  const chapterPoints = [] as Point[]

  const mapOriginLine = (line: Line) => {
    const points = [] as Point[]

    line.points.forEach((p) => {
      if (p.id === point.id) {
        return
      }
      if (p.chapterId != point.id) {
        points.push(p)
        return
      }
      chapterPoints.push(mapMovedPoint(p))
    })

    return { ...line, points }
  }

  const mapMovedPoint = (p: Point) => {
    const x = p.actualPosition.x + destination.deltaX / unitsInPx
    return {
      ...p,
      volumeId: destination.volumeId,
      characterId: destination.characterId,
      actualPosition: { ...p.actualPosition, line: destination.line, x },
    }
  }

  const mapDestinationLine = (line: Line) => {
    return { ...line, points: [...line.points, ...chapterPoints, updatedPoint] }
  }

  return threads
    .map((t) => {
      const threadId = t.volumeId ?? t.characterId ?? ''
      if (threadId !== pointThreadId) return t

      const lines = t.lines.map((l) => {
        if (threadId === pointThreadId && l.index === point.actualPosition.line)
          return mapOriginLine(l)
        return l
      })

      return { ...t, lines }
    })
    .map((t) => {
      const threadId = t.volumeId ?? t.characterId ?? ''
      if (threadId !== destinationThreadId) return t

      const lines = t.lines.map((l) => {
        if (threadId === destinationThreadId && l.index === destination.line)
          return mapDestinationLine(l)
        return l
      })

      return { ...t, lines }
    })
}

export type MovePointAction = {
  type: 'move-point'
  point: Point
  destination: {
    volumeId?: string
    characterId?: string
    chapterId?: string
    line: number
    deltaX: number
  }
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

    return { ...t, lines }
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
