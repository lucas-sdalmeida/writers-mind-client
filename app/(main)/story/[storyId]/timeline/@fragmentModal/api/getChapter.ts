export async function getChapter(chapterId: string) {
  return {
    id: chapterId,
    volumeId: 'a',
    type: 'chapter',
    title: 'Capítulo 1',
  } as Chapter
}

export type Chapter = {
  id: string
  volumeId?: string
  characterId?: string
  title: string
  type: 'chapter'
  summary?: string
  momentDate?: string
  momentTime?: string
  content?: string
}
