import Timeline from './components/Timeline'
import { getTimeline } from './api/get-timeline'

export default async function TimeLinePage({
  params,
}: Readonly<{ params: Promise<{ storyId: string }> }>) {
  const { storyId } = await params
  const timeline = await getTimeline(storyId)

  return <Timeline timeline={timeline} className='w-full h-full' />
}
