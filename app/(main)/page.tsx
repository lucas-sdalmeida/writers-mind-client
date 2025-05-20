import Link from 'next/link'

import StoryCard from './components/StoryCard'
import ImageCard from './components/ImageCard'

import style from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={ style.home }>
      <header className={ style.header }>
        <h2>Salão das Histórias</h2>
      </header>

      <div className={ style.storiesList }>
        <div className={ style.addMoreStoriesCard }>
          <ImageCard />
          <Link href='/story' className={ style.link }>+</Link>
        </div>

        <StoryCard id='1' title='História A' />
      </div>

    </div>
  )
}
