import NarrativeThread from '../components/NarrativeThread'

export type Timeline = {
  storyId: string
  narrativeThreads: NarrativeThread[]
}

export type NarrativeThread = {
  id: string
  volumeId?: string
  characterId?: string
  title?: string
  lines: Line[]
}

export type Line = {
  index: number
  preferences: { name: string; color: string }
  points: Point[]
}

export type Point = {
  id: string
  storyId: string
  narrativeThreadId?: string
  volumeId?: string
  characterId?: string
  chapterId?: string
  type: 'excerpt' | 'chapter'
  title: string
  actualPosition: { line: number; x: number }
  width?: number
}

export default Timeline
