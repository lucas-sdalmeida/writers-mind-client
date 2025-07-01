import { baseUrl } from '../../../../../../api.json'
import { NarrativeThread } from '../context/timeline'

export async function patchTimelineThreads(
  storyId: string,
  threads: NarrativeThread[],
) {
  console.log('A')
  await fetch(`${baseUrl}/timeline/${storyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ narrativeThreads: threads }),
  })
}
