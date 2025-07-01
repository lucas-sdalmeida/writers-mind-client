import { baseUrl } from '../../../api.json'

export async function createUser(request: CreateUserRequest) {
  const response = await fetch(`${baseUrl}/author`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  return (await response.json()).id as string
}

export type CreateUserRequest = {
  name: string
  pseudonym?: string
  email: string
  password: string
}
