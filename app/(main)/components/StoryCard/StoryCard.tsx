import Link from 'next/link'

import ImageCard from '../ImageCard'

export default function StoryCard({
  id,
  title,
  image,
}: Readonly<{ id: string; title: string; image?: string }>) {
  return (
    <div>
      <Link className='decoration-0 rounded-2xl' href={`/story/${id}`}>
        <ImageCard src={image} alt='' />
      </Link>

      <div className='mt-2 px-4 text-[#444444] flex justify-between'>
        <h4>{title}</h4>

        <span className='flex justify-end items-center gap-2'>
          <a href=''>L</a>
          <Link href={`/story/${id}/character`}>C</Link>
          <a href=''>G</a>
          <a href=''>M</a>
        </span>
      </div>
    </div>
  )
}
