import Link from 'next/link'
import { Inter } from 'next/font/google'

import SideMenu from './components/SideMenu'
import TimeLineContextProvider from './context/TimeLineContext'
import { getOneStory } from '../api'

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default async function TimeLineLayout({
  params,
  children,
  fragmentModal,
}: Readonly<Props>) {
  const { storyId } = await params
  const story = await getOneStory(storyId)

  return (
    <div className='w-full h-full relative flex justify-start items-center'>
      <TimeLineContextProvider>
        <div className='w-full flex justify-center absolute z-10 top-4'>
          <h2 className={`${inter.className} text-lg hover:underline`}>
            <Link href={`/story/${storyId}/overview`}>{story.title}</Link>
          </h2>
        </div>

        <div className='w-full h-full relative z-0'>{children}</div>

        <SideMenu storyId={storyId} />

        {fragmentModal}
      </TimeLineContextProvider>
    </div>
  )
}

type Props = {
  params: Promise<{ storyId: string }>
  children: React.ReactNode
  fragmentModal: React.ReactNode
}
