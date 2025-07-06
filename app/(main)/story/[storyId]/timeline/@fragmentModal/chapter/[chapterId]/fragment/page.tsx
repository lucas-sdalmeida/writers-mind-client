import { cookies } from 'next/headers'
import { getChapter } from '../../../api/getChapter'
import FragmentModal from '../../../components/FragmentModal'

export default async function AddFragmentModal({
  params,
}: {
  params: Promise<{ storyId: string; chapterId: string }>
}) {
  const cookiesStore = await cookies()
  const { storyId, chapterId } = await params
  const authorId = cookiesStore.get('accountId')!.value

  const chapter = await getChapter(authorId, storyId, chapterId)
  return <FragmentModal fragment={chapter} />
}
