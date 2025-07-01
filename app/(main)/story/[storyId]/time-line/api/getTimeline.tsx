import { baseUrl } from '../../../../../../api.json'
import type { NarrativeThread } from '../context/timeline'

export async function getTimeline(storyId: string) {
  const response = await fetch(`${baseUrl}/timeline/${storyId}`)
  const json = await response.json()

  console.log(json)
  return json as TimelineDto
}

export type TimelineDto = {
  id: string
  story: { id: string; title: string }
  narrativeThreads: NarrativeThread[]
}
