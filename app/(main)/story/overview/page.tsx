import { LibraryBig, BookPlus } from 'lucide-react'

import SideBar, { LinkOption } from '../../components/SideBar'
import StoryOverviewForm from '../components/StoryOverviewForm'

export default function CreateStoryPage() {
  return (
    <div className='w-full h-full px-8 pt-10 pb-6 grid grid-cols-12 grid-rows-1'>
      <SideBar selectedIndex={1} className='col-start-1 col-span-2'>
        <LinkOption href='/story' icon={<LibraryBig size={16} />}>
          Salão das Histórias
        </LinkOption>
        <LinkOption href='#' icon={<BookPlus size={16} />}>
          Nova História
        </LinkOption>
      </SideBar>

      <StoryOverviewForm className='col-start-3 col-span-10' />
    </div>
  )
}
