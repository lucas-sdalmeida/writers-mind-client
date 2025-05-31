import Story from '@/app/(main)/story/api/story'

export async function getOneStory(id: string) {
  const response = await fetch(`http://localhost:9090/story/${id}`)
  return (await response.json()) as Story
}
