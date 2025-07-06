import { NarrativeThread } from '../context/timeline'

export async function postNarrativeThread(
  authorId: string,
  storyId: string,
  request: PostNarrativeThreadRequest,
) {
  const response = await fetch(
    `http://localhost:8080/author/${authorId}/story/${storyId}/timeline/thread/volume`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    },
  )

  return (await response.json()) as PostNarrativeThreadResponse
}

export type PostNarrativeThreadRequest = {
  title: string
  lines: number[]
}

export type PostNarrativeThreadResponse = {
  narrativeThread: NarrativeThread
}
