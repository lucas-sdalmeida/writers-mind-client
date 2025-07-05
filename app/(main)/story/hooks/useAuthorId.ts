import { useRouter } from 'next/navigation'

export function useAuthorId() {
  const router = useRouter()
  const match = document.cookie.matchAll(/accountId=[\da-z-]{36}/gi).next()

  const id = match.value?.[0].split('=')[1]
  if (!id) router.replace('/login')

  return id
}
