'use client'

import Link from 'next/link'
import { Inter } from 'next/font/google'

import { LibraryBig, BookPlus, Trash2, Plus } from 'lucide-react'

import SideBar, { LinkOption } from '../components/SideBar'
import StoryCard from './components/StoryCard'
import { SearchField } from '../components/InputField'
import { getAllStories, Story } from './api'
import { useEffect, useState } from 'react'
import { useAuthorId } from './hooks/useAuthorId'

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default function HomePage() {
  const authorId = useAuthorId()
  const [stories, setStories] = useState([] as Story[])

  useEffect(() => {
    ;(async () => {
      if (!authorId) return
      setStories(await getAllStories(authorId))
    })()
  }, [authorId, setStories])

  return (
    <div className='w-full h-full px-8 pt-10 pb-6 grid grid-cols-12 grid-rows-1'>
      <SideBar
        className='col-start-1 col-span-2'
        selectedIndex={0}
        header={<SearchField />}
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
        <header className='w-full px-1 border-b-[1px] border-b-[#10c3e2] flex justify-between items-center'>
          <h2 className={`${inter.className} text-2xl`}>Salão das Histórias</h2>

          <Link href='/story/overview' className='border-none bg-transparent'>
            <Plus className='text-[#10c3e2] hover:text-cyan-600' />
          </Link>
        </header>

        <div className='flex-1 w-full px-1 py-4 flex gap-3 flex-wrap overflow-y-auto'>
          {stories.map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
