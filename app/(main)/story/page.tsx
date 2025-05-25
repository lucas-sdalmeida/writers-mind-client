import { Inter, Quicksand } from "next/font/google"
import Link from "next/link"

import { LibraryBig, BookPlus, Trash2, Search } from "lucide-react"

import StoryCard from "./components/StoryCard"

const inter = Inter({ weight: '600', subsets: ['latin'] })
const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default async function HomePage() {
  return (
    <div className='w-full h-full px-8 pt-10 pb-6 grid grid-cols-12 grid-rows-1'>
      <nav className='col-start-1 col-span-2 h-full px-2 py-6 flex flex-col border-r-[1px] border-r-gray-300'>
        <div className='w-full mb-3 px-2 pb-1 border-b-[1px] border-b-[#10c3e2] flex items-center gap-1'>
          <Search size={16} />
          <div className='py-1 text-gray-400 text-sm'>Pesquisar</div>
        </div>

        <ul className={`${quicksand.className} list-none w-full`}>
          <li className='mb-2 last:mb-0 px-2 py-1 rounded-lg text-emerald-600 text-sm hover:underline hover:bg-gray-200'>
            <span className='w-full flex items-center gap-1'>
              <LibraryBig size={16} /> Salão das Histórias
            </span>
          </li>

          <li className='mb-2 last:mb-0 px-2 py-1 rounded-lg text-sm hover:underline hover:bg-gray-200'>
            <span className="w-full flex items-center gap-1">
              <BookPlus size={16} />
              <Link href='/story/overview'>Nova história</Link>
            </span>
          </li>

          <li className='mb-2 last:mb-0 px-2 py-1 rounded-lg text-sm hover:underline hover:bg-gray-200'>
            <span className="w-full flex items-center gap-1">
              <Trash2 size={16} />
              Lixeira
            </span>
          </li>
        </ul>
      </nav>

      <section className='col-start-3 col-span-10 h-full px-8 flex flex-col gap-3'>
        <header className='w-full px-1 border-b-[1px] border-b-[#10c3e2]'>
          <h2 className={`${inter.className} text-2xl`}>Salão das Histórias</h2>
        </header>

        <div className="flex-1 w-full px-1 py-4 flex gap-3 flex-wrap overflow-y-auto">
          <StoryCard story={{ id: '1', title: 'História A' }} />
        </div>
      </section>

    </div>
  )
}
