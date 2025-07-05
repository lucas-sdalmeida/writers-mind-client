export async function postStory(authorId: string, request: PostStoryRequest) {
  const response = await fetch(
    `http://localhost:8080/author/${authorId}/story`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    },
  )
  const json = await response.json()
  return json.storyId as string
}

export type PostStoryRequest = {
  title: string
  themes?: string
  objectives?: string
  mainPlot?: string
  genres?: string
  setting?: string
  summary?: string
}
