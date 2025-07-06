import { Point } from '../../context/timeline'

export async function postFragment(
  authorId: string,
  storyId: string,
  request: PostFragmentRequest,
) {
  const url = request.chapterId
    ? `http://localhost:8080/author/${authorId}/story/${storyId}/timeline/chapter/${request.chapterId}/fragment`
    : `http://localhost:8080/author/${authorId}/story/${storyId}/timeline/fragment`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  const json = await response.json()
  return json as Point
}

export type PostFragmentRequest = {
  title: string
  volumeId?: string
  characterId?: string
  chapterId?: string
  summary?: string
  momentDate?: Date
  momentTime?: Date
  content?: string
  line: number
  x: number
}
