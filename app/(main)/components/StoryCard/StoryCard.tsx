import Link from 'next/link'

import ImageCard from '../ImageCard'
import style from './StoryCard.module.css'

export default function StoryCard({ id, title, image }: Readonly<{ id: string, title: string, image?: string }>) {
  return (
    <div>
      <Link className={ style.storyImage } href={ `/story/${id}` }>
        <ImageCard src={ image } alt='' />
      </Link>

      <div className={ style.cardOptions }>
        <h4>{ title }</h4>

        <span>
          <a href="">L</a>
          <a href="">C</a>
          <a href="">G</a>
          <a href="">M</a>
        </span>
      </div>
    </div>
  )
}
