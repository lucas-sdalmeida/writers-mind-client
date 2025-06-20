'use client'

import Link from 'next/link'
import { Quicksand } from 'next/font/google'

import {
  LibraryBig,
  GitCommitHorizontal,
  UsersRound,
  Waypoints,
  Plus,
} from 'lucide-react'

import { useTimeLineContext } from '../../context/TimeLineContext'
import LoosePointsGroupItem from './LoosePointsGroupItem'
import { useAddLine } from '../../hooks/useAddLine'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function SideMenu({ storyId }: { storyId: string }) {
  const { timeLine } = useTimeLineContext()
  const addLine = useAddLine()

  return (
    <div
      className={`${quicksand.className} w-56 h-5/6 ml-8 px-3 pb-3 rounded-2xl shadow-lg bg-white absolute z-10 flex flex-col gap-2`}
    >
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

      <div className='w-full px-2 flex justify-between items-center'>
        <p className='text-xs'>Linhas do tempo</p>
        <Plus
          size={14}
          className='text-[#10c3e2] hover:text-cyan-600'
          onClick={() => addLine()}
        />
      </div>

      <ul className='flex-1 w-full h-full p-2 rounded-md bg-gray-100'>
        {timeLine.lineGroups.map((group, index) => {
          if (!group.id)
            return <LoosePointsGroupItem key={index} lineGroup={group} />
          return <></>
        })}
      </ul>
    </div>
  )
}
