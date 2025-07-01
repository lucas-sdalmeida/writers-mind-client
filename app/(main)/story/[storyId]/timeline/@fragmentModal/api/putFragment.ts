import { baseUrl } from '../../../../../../../api.json'

export async function putFragment(id: string, request: PutFragmentRequest) {
  await fetch(`${baseUrl}/fragment/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}

export type PutFragmentRequest = {
  id: string
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
