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
            points: [
              {
                id: 'abc',
                title: 'Ponto A',
                type: 'excerpt',
                actualPosition: { line: 0, x: 5 },
              },
              {
                id: 'abcd',
                title: 'Ponto B',
                type: 'excerpt',
                actualPosition: { line: 0, x: 6 },
              },
            ],
          },
          {
            index: 1,
            preferences: { name: 'linha 2', color: '#e21010' },
            points: [
              {
                id: 'abcde',
                title: 'Ponto C',
                type: 'excerpt',
                actualPosition: { line: 1, x: 5.1 },
              },
            ],
          },
        ],
      },
      {
        volumeId: 'a',
        lines: [
          {
            index: 0,
            preferences: { name: 'linha 1', color: '#e28010' },
            points: [
              {
                id: 'abcdef',
                volumeId: 'a',
                title: 'Capitulo 1',
                type: 'chapter',
                actualPosition: { line: 0, x: 1, width: 3 },
              },
              {
                id: 'abcdefg',
                volumeId: 'a',
                chapterId: 'abcdef',
                title: 'Ponto D',
                type: 'excerpt',
                actualPosition: { line: 0, x: 1.5 },
              },
            ],
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
