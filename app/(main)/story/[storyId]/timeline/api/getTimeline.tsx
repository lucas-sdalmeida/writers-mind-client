import type { NarrativeThread } from '../context/timeline'

export async function getTimeline(authorId: string, storyId: string) {
  const response = await fetch(
    `http://localhost:8080/author/${authorId}/story/${storyId}/timeline`,
  )
  const json = await response.json()

  console.log(json)
  return json as TimelineDto
}

export type TimelineDto = {
  id: string
  story: { id: string; title: string }
  narrativeThreads: NarrativeThread[]
}
