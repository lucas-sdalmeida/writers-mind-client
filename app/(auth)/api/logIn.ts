export async function logIn(request: CreateUserRequest) {
  const response = await fetch('http://localhost:8080/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  return (await response.json()).accountId as string
}

export type CreateUserRequest = {
  email: string
  password: string
}
