import TimeLine from './components/TimeLine'
import { getOneStory } from '../api'

export default async function TimeLinePage({
  params,
}: Readonly<{ params: Promise<{ storyId: string }> }>) {
  const { storyId } = await params
  const story = await getOneStory(storyId)

  return <TimeLine story={story} className='w-full h-full' />
}
