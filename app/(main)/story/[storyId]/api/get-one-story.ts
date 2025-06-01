import api from '../../../../../api.json'
import type { Story } from '@/app/(main)/story/api/story'

export async function getOneStory(id: string) {
  const response = await fetch(`${api.baseUrl}/story/${id}`)
  return (await response.json()) as Story
}
