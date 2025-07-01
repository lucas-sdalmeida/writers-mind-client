import {
  Search,
  LibraryBig,
  GitCommitHorizontal,
  UsersRound,
  Waypoints,
  Plus,
} from 'lucide-react'
import SideBar, { LinkOption } from '@/app/(main)/components/SideBar'

export default async function CharactersLayout({
  params,
  children,
}: Readonly<Props>) {
  const { storyId } = await params

  return (
    <div className='w-full h-full px-8 pt-10 pb-6 grid grid-cols-12 grid-rows-1'>
      <SideBar
        className='col-span-2'
        header={
          <>
            <Search size={16} />
            <div className='py-1 text-gray-400 text-sm'>Pesquisar</div>
          </>
        }
        selectedIndex={2}
      >
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

      <div className='col-start-3 col-span-10 w-full h-full'>{children}</div>
    </div>
  )
}

type Props = {
  params: Promise<{ storyId: string }>
  children: React.ReactNode
}
