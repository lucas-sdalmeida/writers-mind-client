import {
  LibraryBig,
  GitCommitHorizontal,
  UsersRound,
  Waypoints,
} from 'lucide-react'

import SideBar, { LinkOption } from '@/app/(main)/components/SideBar'
import StoryOverviewForm from '../../components/StoryOverviewForm'
import { getOneStory } from '../api'

export default async function StoryOverviewPage({ params }: Readonly<Props>) {
  const { storyId } = await params
  const story = await getOneStory(storyId)

  return (
    <div className='w-full h-full px-8 pt-10 pb-6 grid grid-cols-12 grid-rows-1'>
      <SideBar selectedIndex={1} className='col-start-1 col-span-2'>
        <LinkOption href='/story' icon={<LibraryBig size={16} />}>
          Salão das Histórias
        </LinkOption>
        <LinkOption
          href={`/story/${storyId}/timeline`}
          icon={<GitCommitHorizontal size={16} />}
        >
          Linha do Tempo
        </LinkOption>
        <LinkOption
          href={`/story/${storyId}/character`}
          icon={<UsersRound size={16} />}
        >
          Salão dos Heróis
        </LinkOption>
        <LinkOption
          href={`/story/${storyId}/idea`}
          icon={<Waypoints size={16} />}
        >
          Mapa de Ideias
        </LinkOption>
      </SideBar>

      <StoryOverviewForm story={story} className='col-start-3 col-span-10' />
    </div>
  )
}

type Props = {
  params: Promise<{ storyId: string }>
}
