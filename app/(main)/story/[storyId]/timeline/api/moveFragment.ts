import { Point } from '../context/timeline'

export async function moveFragment(
  authorId: string,
  storyId: string,
  fragmentId: string,
  request: MoveFragmentRequest,
) {
  const response = await fetch(
    `http://localhost:8080/author/${authorId}/story/${storyId}/timeline/fragment/${fragmentId}/position`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    },
  )

  return (await response.json()) as MoveFragmentResponse
}

export type MoveFragmentRequest = {
  narrativeThreadId?: string
  line: number
  deltaX: number
}

export type MoveFragmentResponse = {
  movedFragments: { [id: string]: Point }
}
