import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import {
  GitCommitHorizontal,
  UsersRound,
  Waypoints,
  MoreVertical,
  Image as ImageIcon,
} from 'lucide-react'

import Story from '../../api/Story'

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div className='w-60 h-fit group'>
      <div className='w-full h-36 rounded-xl bg-[#d9d9d9] shadow-[4px_4px_4px_#00000040]'>
        <Link
          href={`/story/${story.id}/time-line`}
          className='w-full h-full no-underline flex justify-center items-center'
        >
          {story.coverImage ? (
            <Image
              src={story.coverImage}
              alt={`Imagem de capa da história ${story.title}!`}
              width={240}
              height={144}
            />
          ) : (
            <ImageIcon size={48} color='#707070' />
          )}
        </Link>
      </div>
      <div className='w-full px-2 py-1 flex justify-between items-center'>
        <h4 className={`${inter.className} text-sm`}>{story.title}</h4>

        <div className='text-xs flex gap-2 items-center invisible group-hover:visible'>
          <Link
            href={`/story/${story.id}/time-line`}
            className='hover:text-emerald-600'
          >
            <GitCommitHorizontal strokeWidth={1} />
          </Link>
          <Link
            href={`/story/${story.id}/character`}
            className='hover:text-emerald-600'
          >
            <UsersRound size={16} />
          </Link>
          <Link
            href={`/story/${story.id}/ideas`}
            className='hover:text-emerald-600'
          >
            <Waypoints size={16} />
          </Link>
          <Link href='/' className='hover:text-emerald-600'>
            <MoreVertical size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
