import Link from 'next/link'
import { Inter } from 'next/font/google'

import SideMenu from './components/SideMenu'
import ContextMenu from './components/ContextMenu'
import NarrativeThreadModal from './components/NarrativeThreadModal'
import TimeLineContextProvider from './context/TimeLineContext'
import SelectionContextProvider from './context/SelectionContext'
import { getTimeline } from './api/get-timeline'

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default async function TimeLineLayout({
  params,
  children,
  fragmentModal,
}: Readonly<Props>) {
  const { storyId } = await params
  const timeline = await getTimeline(storyId)

  return (
    <div className='w-full h-full relative flex justify-start items-center'>
      <TimeLineContextProvider timeline={timeline}>
        <SelectionContextProvider>
          <div className='w-full flex justify-center absolute z-10 top-4'>
            <h2 className={`${inter.className} text-lg hover:underline`}>
              <Link href={`/story/${storyId}/overview`}>
                Título da História
              </Link>
            </h2>
          </div>

          <div className='w-full h-full relative z-0 overflow-hidden'>
            {children}
          </div>

          <SideMenu storyId={storyId} />

          {fragmentModal}

          <NarrativeThreadModal />

          <ContextMenu />
        </SelectionContextProvider>
      </TimeLineContextProvider>
    </div>
  )
}

type Props = {
  params: Promise<{ storyId: string }>
  children: React.ReactNode
  fragmentModal: React.ReactNode
}
