import { Point } from '../../context/timeline'

export async function postChapter(
  authorId: string,
  storyId: string,
  request: PostFragmentRequest,
) {
  const response = await fetch(
    `http://localhost:8080/author/${authorId}/story/${storyId}/timeline/chapter`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    },
  )

  const json = await response.json()
  return json as { chapter: Point; excerpt: Point }
}

export type PostFragmentRequest = {
  title: string
  narrativeThreadId?: string
  volumeId?: string
  characterId?: string
  summary?: string
  momentDate?: Date
  momentTime?: Date
  content?: string
  line: number
  x: number
  excerptTitle: string
  excerptSummary?: string
}
