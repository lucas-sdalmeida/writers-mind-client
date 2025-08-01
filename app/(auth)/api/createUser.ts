export async function createUser(request: CreateUserRequest) {
  const response = await fetch('http://localhost:8080/account/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  return (await response.json()).accountId as string
}

export type CreateUserRequest = {
  name: string
  pseudonym?: string
  email: string
  password: string
}
