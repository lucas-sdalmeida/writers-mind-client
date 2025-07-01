import { getChapter } from '../../api/getChapter'
import FragmentModal from '../../components/FragmentModal'

export default async function AddFragmentModal({
  params,
}: {
  params: Promise<{ chapterId: string }>
}) {
  const { chapterId } = await params
  const chapter = await getChapter(chapterId)
  return <FragmentModal fragment={chapter} />
}
