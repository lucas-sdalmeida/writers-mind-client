import StoryForm from "./components/StoryForm"
import style from './NewStoryPage.module.css'

export default function NewStoryPage() {
  return (
    <div className={ style.newStoryPage }>
      <StoryForm></StoryForm>
    </div>
  )
}
