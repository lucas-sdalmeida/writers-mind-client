import { baseUrl } from '../../../../../../../api.json'

export async function postFragment(
  storyId: string,
  request: PostFragmentRequest,
) {
  const response = await fetch(`${baseUrl}/fragment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  const json = await response.json()

  return json.id as string
}

export type PostFragmentRequest = {
  title: string
  type: 'excerpt' | 'chapter'
  volumeId?: string
  characterId?: string
  chapterId?: string
  summary?: string
  momentDate?: Date
  momentTime?: Date
  content?: string
  position: { line: number; x: number; width?: number }
}
