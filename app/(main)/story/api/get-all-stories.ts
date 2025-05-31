import { baseUrl } from '../../../../api.json'
import { Story } from './story'

export async function getAllStories() {
  const response = await fetch(`${baseUrl}/story`)
  const json = await response.json()
  return json.stories as Story[]
}
