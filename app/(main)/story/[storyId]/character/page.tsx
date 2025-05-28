import { Inter } from "next/font/google"

import { Search, LibraryBig, GitCommitHorizontal, UsersRound, Waypoints, Plus, Image as ImageIcon } from "lucide-react"

import SideBar, { LinkOption } from "@/app/(main)/components/SideBar"

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default async function CharactersPage({ params }: Readonly<Props>) {
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
        <LinkOption href='/story' icon={<LibraryBig size={16} />} >Salão das Histórias</LinkOption>
        <LinkOption href={`/story/${storyId}/time-line`} icon={<GitCommitHorizontal size={16} />} >Linha do Tempo</LinkOption>
        <LinkOption href='#' icon={<UsersRound size={16} />} >Salão dos Heróis</LinkOption>
        <LinkOption href={`/story/${storyId}/ideas`} icon={<Waypoints size={16} />} >Mapa de Ideias</LinkOption>
      </SideBar>

      <section className="col-start-3 col-span-10 w-full h-full px-8 flex flex-col gap-3">
        <header className="w-full px-1 border-b-[1px] border-b-[#10c3e2] flex justify-between items-center">
          <h2 className={`${inter.className} text-2xl`}>Salão dos Heróis</h2>

          <button className='border-none bg-transparent'>
            <Plus className='text-[#10c3e2] hover:text-cyan-600' />
          </button>
        </header>

        <div className="flex-1 w-full px-1 py-4 flex gap-3 overflow-y-auto">
          
        </div>
      </section>
    </div>
  )
}

type Props = {
  params: Promise<{ storyId: string }>
}
