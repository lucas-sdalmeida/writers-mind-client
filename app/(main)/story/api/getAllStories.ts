import { Story } from './story'

export async function getAllStories(authorId: string) {
  const response = await fetch(`http://localhost:8080/author/${authorId}/story`)
  const json = await response.json()
  return json.stories as Story[]
}
