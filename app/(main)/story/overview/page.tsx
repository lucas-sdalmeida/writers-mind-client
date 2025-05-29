import { Inter, Quicksand } from 'next/font/google'

import {
  LibraryBig,
  BookPlus,
  Image as ImageIcon,
  PenSquare,
} from 'lucide-react'

import SideBar, { LinkOption } from '../../components/SideBar'
import InputField from '../../components/InputField'

const inter = Inter({ weight: '600', subsets: ['latin'] })
const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

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

      <form className='col-start-3 col-span-10 w-full h-full flex gap-2'>
        <div className='flex-1 px-6 flex flex-col gap-3'>
          <div className='w-full mb-6 px-2 pt-2 pb-1 border-b-[1px] border-b-[#10c3e2]'>
            <label className={`${inter.className} flex items-start gap-1`}>
              <input
                className='min-w-72 w-auto rounded-md bg-transparent outline-none placeholder-gray-400'
                type='text'
                name='title'
                placeholder='Minha História...'
              />

              <PenSquare size={14} />
            </label>
          </div>

          <div className='flex-1 px-3 flex flex-col gap-3'>
            <InputField
              label='Tema:'
              name='themes'
              placeholder='Sobre o que é a sua história?'
            />

            <InputField
              label='Objetivos:'
              name='objectives'
              placeholder='Quais seus objectivos ao escrever essa história?'
            />

            <InputField
              label='Trama principal:'
              name='mainPlot'
              placeholder='Qual a jornada principal? O que os protagonistas buscam?'
            />

            <InputField
              label='Gêneros:'
              name='genres'
              placeholder='Em quais gêneros você acredita que sua história se encaixa?'
            />

            <InputField
              label='Ambientação:'
              name='setting'
              placeholder='Qual o tipo de mundo no qual sua história se passa?'
            />

            <textarea
              className={`${quicksand.className} flex-1 w-full px-2 py-1 rounded-lg border-[1px] border-gray-300 outline-1 outline-gray-400 bg-transparent placeholder-gray-400`}
              name='summary'
              placeholder='Descreva um pouco sua história...'
            ></textarea>
          </div>

          <div className='w-full p-2 flex justify-end items-center gap-3'>
            <button className='px-3 py-1 rounded-xl bg-[#10c3e2] hover:bg-cyan-600 text-white hover:underline'>
              Salvar
            </button>

            <button className='px-3 py-1 rounded-xl bg-[#e21010] hover:bg-[#a21010] text-white hover:underline'>
              Cancelar
            </button>
          </div>
        </div>

        <div className='w-1/3 h-full hover:bg-[#d9d9d9] rounded-3xl group duration-500 flex justify-center items-center'>
          <ImageIcon
            size={48}
            className='text-gray-400 group-hover:text-[#707070]'
          />
        </div>
      </form>
    </div>
  )
}
