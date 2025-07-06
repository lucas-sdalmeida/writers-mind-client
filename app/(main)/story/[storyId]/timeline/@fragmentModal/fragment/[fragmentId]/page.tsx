import { cookies } from 'next/headers'
import { getChapter } from '../../api/getChapter'
import FragmentModal from '../../components/FragmentModal'

export default async function AddFragmentModal({
  params,
}: {
  params: Promise<{ storyId: string; fragmentId: string }>
}) {
  const cookiesStore = await cookies()
  const { storyId, fragmentId } = await params
  const authorId = cookiesStore.get('accountId')!.value

  const chapter = await getChapter(authorId, storyId, fragmentId)
  return <FragmentModal fragment={chapter} />
}
