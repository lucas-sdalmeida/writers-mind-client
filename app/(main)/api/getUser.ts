export async function getUser(userId: string) {
  const response = await fetch('http://localhost:9090/author/' + userId)
  return (await response.json()) as Author
}

export type Author = {
  id: string
  name: string
  pseudonym?: string
  email: string
  pictureUrl?: string
}
