export async function getTimeline(storyId: string) {
  return {
    story: { id: storyId, title: 'Minha História' },
    narrativeThreads: [],
  } as Timeline
}

export type Timeline = {
  story: { id: string; title: string }
  narrativeThreads: { volumeId?: string; characterId?: string; title: string }[]
}
