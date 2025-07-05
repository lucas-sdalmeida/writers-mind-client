import { Story } from './story'

export async function getAllStories() {
  const response = await fetch(`http://localhost:8080/story`)
  const json = await response.json()
  return json.stories as Story[]
}
