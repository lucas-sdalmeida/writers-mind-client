import Story from '../../api/Story'

export async function postStory(story: PostStoryRequest) {
  const response = await fetch('http://localhost:9090/story', {
    method: 'POST',
    body: JSON.stringify(story),
  })
  return { code: response.status, content: await response.json() }
}

export type PostStoryRequest = {
  title: string
  coverDrawing?: string
  objectives?: string
  themes?: string
  mainPlot?: string
  setting?: string
  summary?: string
}
