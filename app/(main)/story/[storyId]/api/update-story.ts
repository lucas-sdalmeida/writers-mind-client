import Story from '@/app/(main)/story/api/story'

export async function updateStory(story: Story) {
  await fetch(`http://localhost:9090/story/${story.id}`, {
    method: 'PUT',
    body: JSON.stringify(story),
  })
}
