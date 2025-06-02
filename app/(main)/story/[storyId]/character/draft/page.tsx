'use client'

import { Image as ImageIcon, PenSquare } from 'lucide-react'
import { useState } from 'react'

import { EditableText } from '@/app/(main)/components/InputField'
import { ConfirmButton, DangerButton } from '@/app/(main)/components/Button'

export default function CharacterDraftPage() {
  const [character, setCharacter] = useState({} as CharacterDraft)

  return (
    <form className='w-full h-full flex gap-3'>
      <div className='flex-1 px-8 flex flex-col gap-3'>
        <div className='w-full px-1 border-b-[1px] border-b-[#10c3e2]'>
          <EditableText
            placeholder='Me chamo...'
            value={character.name ?? ''}
            onChange={(v) => setCharacter({ ...character, name: v })}
          />
        </div>

        <div className='flex-1 w-full h-full'></div>

        <div className='w-full p-2 flex justify-end items-center gap-3'>
          <ConfirmButton>Salvar</ConfirmButton>
          <DangerButton>Cancelar</DangerButton>
        </div>
      </div>

      <label className='w-1/3 h-full flex justify-center items-center group hover:bg-[#d9d9d9] hover:shadow-[0_0_8px_8px_#d9d9d9] duration-500'>
        <ImageIcon
          className='text-gray-400 group-hover:text-[#707070]'
          size={48}
        />
        <input
          className='hidden'
          type='file'
          name='characterDrawing'
          accept='image/*'
        />
      </label>
    </form>
  )
}

type CharacterDraft = {
  name?: string
  attributes: { [attributeName: string]: string }[]
}
