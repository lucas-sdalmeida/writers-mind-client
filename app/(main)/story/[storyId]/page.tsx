import StoryForm from '../components/StoryForm'
import style from './StoryPage.module.css'

export default function StoryPage() {
  return (
    <div className={ style.storyPage }>
      <StoryForm story={{ title: 'Minha História' }} />
    </div>
  )
}
