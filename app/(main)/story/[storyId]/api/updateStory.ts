import { baseUrl } from '../../../../../api.json'
import type { Story } from '@/app/(main)/story/api/story'

export async function updateStory(story: Story) {
  await fetch(`${baseUrl}/story/${story.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(story),
  })
}
