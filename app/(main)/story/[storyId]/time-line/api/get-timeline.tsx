export async function getTimeline(storyId: string) {
  return {
    story: { id: storyId, title: 'Minha História' },
    volumes: [],
    biographies: [],
  } as Timeline
}

export type Timeline = {
  story: { id: string; title: string }
  volumes: string[]
  biographies: string[]
}
