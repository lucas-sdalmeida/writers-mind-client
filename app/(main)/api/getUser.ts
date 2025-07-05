export async function getUser(userId: string) {
  const response = await fetch('http://localhost:8080/author/account/' + userId)
  return (await response.json()) as Author
}

export type Author = {
  id: string
  name: string
  pseudonym?: string
  pictureUrl?: string
  accountId: string
}
