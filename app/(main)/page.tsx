import Link from 'next/link'

import StoryCard from './components/StoryCard'
import ImageCard from './components/ImageCard'

import style from './HomePage.module.css'

import { getAllStories } from './api/get-story'
import { useEffect } from 'react'

export default async function HomePage() {
  const stories = await getStories()

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

        { 
          stories.stories.map((s) => <StoryCard key={s.id} id={s.id} title={s.title} />)
        }
      </div>

    </div>
  )
}

async function getStories() {
  try {
    return await getAllStories()
  } catch {
    return { stories: [] }
  }
}
