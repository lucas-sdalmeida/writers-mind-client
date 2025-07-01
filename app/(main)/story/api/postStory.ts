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

  await fetch(`${baseUrl}/timeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: json.id as string,
      story: { id: json.id as string, title: request.title },
      narrativeThreads: [
        {
          narrativeThreadId: ('' + Math.random() * 10000).replace('.', '-'),
          lines: [
            {
              index: 0,
              preferences: { name: 'linha 1', color: '#10c3e2' },
              points: [],
            },
          ],
        },
      ],
    }),
  })

  return json.id as string
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
