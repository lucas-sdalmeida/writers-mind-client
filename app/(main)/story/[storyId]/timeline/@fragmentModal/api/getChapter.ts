import { baseUrl } from '../../../../../../../api.json'

export async function getChapter(chapterId: string) {
  const response = await fetch(`${baseUrl}/fragment/${chapterId}`)
  const json = await response.json()
  return json as Chapter
}

export type Chapter = {
  id: string
  storyId: string
  volumeId?: string
  characterId?: string
  title: string
  type: 'chapter'
  summary?: string
  momentDate?: Date
  momentTime?: Date
  content?: string
}
