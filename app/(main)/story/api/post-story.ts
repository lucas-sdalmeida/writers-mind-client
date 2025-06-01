import { baseUrl } from '../../../../api.json'

export async function postStory(request: PostStoryRequest) {
  const response = await fetch(`${baseUrl}/story`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  const json = await response.json()
  return json.storyId as string
}

export type PostStoryRequest = {
  title?: string
  themes?: string
  objectives?: string
  mainPlot?: string
  genres?: string
  setting?: string
  summary?: string
}
