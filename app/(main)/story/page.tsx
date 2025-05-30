import { Inter } from 'next/font/google'

import { LibraryBig, BookPlus, Trash2, Search } from 'lucide-react'

import SideBar, { LinkOption } from '../components/SideBar'
import StoryCard from './components/StoryCard'
import { SearchField } from '../components/InputField'

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default async function HomePage() {
  return (
    <div className='w-full h-full px-8 pt-10 pb-6 grid grid-cols-12 grid-rows-1'>
      <SideBar
        className='col-start-1 col-span-2'
        selectedIndex={0}
        header={
          <>
            <SearchField></SearchField>
          </>
        }
      >
        <LinkOption href='#' icon={<LibraryBig size={16} />}>
          Salão das Histórias
        </LinkOption>
        <LinkOption href='/story/overview' icon={<BookPlus size={16} />}>
          Nova História
        </LinkOption>
        <LinkOption href='/story/trash' icon={<Trash2 size={16} />}>
          Lixeira
        </LinkOption>
      </SideBar>

      <section className='col-start-3 col-span-10 h-full px-8 flex flex-col gap-3'>
        <header className='w-full px-1 border-b-[1px] border-b-[#10c3e2]'>
          <h2 className={`${inter.className} text-2xl`}>Salão das Histórias</h2>
        </header>

        <div className='flex-1 w-full px-1 py-4 flex gap-3 flex-wrap overflow-y-auto'>
          <StoryCard story={{ id: '1', title: 'História A' }} />
        </div>
      </section>
    </div>
  )
}
