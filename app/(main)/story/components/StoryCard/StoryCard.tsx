import Link from "next/link"
import { Inter } from "next/font/google"
import Story from "../../api/Story"

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div className='w-60 h-fit group'>
      <div className='w-full h-36 rounded-xl bg-[#d9d9d9]'>

      </div>
      <div className='w-full px-2 py-1 flex justify-between items-center'>
        <h4 className={`${inter.className} text-sm`}>{story.title}</h4>

        <div className='text-xs flex gap-2 invisible group-hover:visible' >
          <Link href={`/story/${story.id}/time-line`}>L</Link>
          <Link href={`/story/${story.id}/character`}>C</Link>
          <Link href={`/story/${story.id}/ideas`}>M</Link>
          <Link href='/'>+</Link>
        </div>
      </div>
    </div>
  )
}
