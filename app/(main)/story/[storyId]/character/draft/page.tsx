'use client'

import { Inter } from "next/font/google"
import { Image as ImageIcon, PenSquare } from "lucide-react"
import { useState } from "react"

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default function CharacterDraftPage() {
  const [character, setCharacter] = useState({} as CharacterDraft)

  return (
    <form className='w-full h-full flex gap-3'>
      <div className="flex-1 px-8 flex flex-col gap-3">
        <div className="w-full px-1 border-b-[1px] border-b-[#10c3e2]">
          <label className="w-full flex items-start gap-3">
            <input 
              className={`${inter.className} text-2xl bg-transparent outline-none placeholder-gray-400`}
              value={ character.name ?? '' }
              placeholder='Me chamo...' 
              onChange={ (e) => setCharacter({ ...character, name: e.target.value }) } 
            />
            <PenSquare size={14} />
          </label>
        </div>

        <div className="flex-1 w-full h-full">

        </div>

        <div className="w-full p-2 flex justify-end items-center gap-3">
          <button className='px-3 py-1 rounded-xl bg-[#10c3e2] hover:bg-cyan-600 text-white hover:underline'>
            Salvar
          </button>

          <button className="px-3 py-1 rounded-xl bg-[#e21010] hover:bg-[#a21010] text-white hover:underline">
            Cancelar
          </button>
        </div>
      </div>

      <div className="w-1/3 h-full rounded-2xl flex justify-center items-center group hover:bg-[#d9d9d9] duration-500">
        <ImageIcon className="text-gray-400 group-hover:text-[#707070]" size={48} />
      </div>
    </form>
  )
}

type CharacterDraft = {
  name?: string,
  attributes: { [attributeName: string]: string }[]
}

