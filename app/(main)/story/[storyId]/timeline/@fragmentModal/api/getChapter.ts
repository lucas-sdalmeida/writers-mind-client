export async function getChapter(
  authorId: string,
  storyId: string,
  chapterId: string,
) {
  const response = await fetch(
    `http://localhost:8080/author/${authorId}/story/${storyId}/timeline/fragment/${chapterId}`,
  )
  const json = await response.json()
  return json as Chapter
}

export type Chapter = {
  id: string
  storyId: string
  narrativeThreadId?: string
  volumeId?: string
  characterId?: string
  title: string
  type: 'chapter' | 'excerpt'
  summary?: string
  momentDate?: Date
  momentTime?: Date
  content?: string
}
