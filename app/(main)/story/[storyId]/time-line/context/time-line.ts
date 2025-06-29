export default class Timeline {
  offset?: number
  narrativeThreads: NarrativeThread[] = []

  constructor(threads?: NarrativeThread[]) {
    if (threads) threads.forEach((t) => this.narrativeThreads.push(t))

    const line = {
      index: 0,
      preferences: { name: 'linha 1', color: '#10c3e2' },
    }
    this.narrativeThreads.push({ lines: [line] })
  }
}

export type NarrativeThread = {
  volumeId?: string
  characterId?: string
  title?: string
  lines: Line[]
}

export type Line = {
  index: number
  preferences: { name: string; color: string }
}

export type Point = {
  id: string
  volumeId?: string
  chapterId?: string
  title: string
  actualPosition: { line: number; x: number }
}
