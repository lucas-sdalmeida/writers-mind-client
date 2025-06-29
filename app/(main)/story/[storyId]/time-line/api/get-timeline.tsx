import type { NarrativeThread } from '../context/timeline'

export async function getTimeline(storyId: string) {
  return {
    story: { id: storyId, title: 'Minha História' },
    narrativeThreads: [
      {
        lines: [
          {
            index: 0,
            preferences: { name: 'linha 1', color: '#10c3e2' },
            points: [],
          },
          {
            index: 1,
            preferences: { name: 'linha 2', color: '#10c3e2' },
            points: [],
          },
        ],
      },
      {
        volumeId: 'a',
        lines: [
          {
            index: 0,
            preferences: { name: 'linha 1', color: '#10c3e2' },
            points: [],
          },
        ],
      },
    ],
  } as TimelineDto
}

export type TimelineDto = {
  story: { id: string; title: string }
  narrativeThreads: NarrativeThread[]
}
