import { baseUrl } from '../../../api.json'

export async function getUsers() {
  const response = await fetch(`${baseUrl}/author`)
  return (await response.json()) as Author[]
}

export type Author = {
  id: string
  name: string
  pseudonym?: string
  email: string
  password: string
}
