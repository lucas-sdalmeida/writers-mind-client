import Link from 'next/link'
import { Inter } from 'next/font/google'

import {
  LibraryBig,
  GitCommitHorizontal,
  UsersRound,
  Waypoints,
} from 'lucide-react'

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

        <div className='w-56 h-5/6 ml-8 px-3 rounded-2xl shadow-lg bg-white absolute z-10 flex flex-col'>
          <div className='border-b-[1px] border-b-gray-300 flex justify-evenly items-center'>
            <Link href='/story' className='p-2 rounded-t-md hover:bg-gray-200'>
              <LibraryBig size={18} />
            </Link>
            <Link
              href='#'
              className='p-2 rounded-t-md text-emerald-600 hover:bg-gray-200'
            >
              <GitCommitHorizontal size={18} />
            </Link>
            <Link
              href={`/story/${storyId}/character`}
              className='p-2 rounded-t-md hover:bg-gray-200'
            >
              <UsersRound size={18} />
            </Link>
            <Link
              href={`/story/${storyId}/idea`}
              className='p-2 rounded-t-md hover:bg-gray-200'
            >
              <Waypoints size={18} />
            </Link>
          </div>
        </div>

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
