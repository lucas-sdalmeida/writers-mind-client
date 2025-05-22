import StoryForm from './components/StoryForm'
import { getOneStory } from './api/get-one-story'
import style from './StoryPage.module.css'

export default async function StoryPage({ params }: Readonly<Props>) {
  const { storyId } = await params
  const story = await getOneStory(storyId)

  return (
    <div className={style.storyPage}>
      <StoryForm story={story} />
    </div>
  )
}

type Props = {
  params: Promise<{ storyId: string }>
}
