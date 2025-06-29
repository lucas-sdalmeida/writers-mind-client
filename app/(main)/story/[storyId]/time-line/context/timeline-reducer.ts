import type { TimelineDto } from '../api/get-timeline'
import type Timeline from './timeline'
import { Line, NarrativeThread, Point } from './timeline'

export function timeLineReducer(previous: Timeline, action: Action) {
  if (action.type == 'move-point') return movePoint(previous, action)
  return initTimeline(action.timeline)
}

export type Action = InitAction | MovePointAction

function initTimeline(timeline: TimelineDto) {
  return { narrativeThreads: timeline.narrativeThreads }
}

export type InitAction = {
  type: 'init'
  timeline: TimelineDto
}

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
