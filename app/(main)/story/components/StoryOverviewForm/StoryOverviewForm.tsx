'use client'

import Link from 'next/link'

import { ImageIcon } from 'lucide-react'

import {
  EditableText,
  InputField,
  TextArea,
} from '@/app/(main)/components/InputField'
import { ConfirmButton, DangerButton } from '@/app/(main)/components/Button'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { postStory } from '../../api/postStory'
import type { Story } from '../../api'
import { updateStory } from '../../[storyId]/api'
import { useAuthorId } from '../../hooks/useAuthorId'

export default function StoryOverviewForm({
  story,
  className,
}: Readonly<{ story?: Story; className?: string }>) {
  const authorId = useAuthorId()

  const [editingStory, setEditingStory] = useState(
    story || ({} as EditingStory),
  )
  const router = useRouter()

  const handleChangeValue = (key: string, value: string) => {
    setEditingStory({ ...editingStory, [key]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (story) {
      await updateStory({ ...story, ...editingStory })
      router.push(`/story/${story.id}/timeline`)
      return
    }

    const id = await postStory(authorId!, {
      ...editingStory,
      title: editingStory.title ?? '',
    })
    router.push(`/story/${id}/timeline`)
  }

  return (
    <form
      className={`${className} w-full h-full flex gap-2`}
      onSubmit={handleSubmit}
    >
      <div className='flex-1 px-6 flex flex-col gap-3'>
        <div className='w-full mb-6 px-2 pt-2 pb-1 border-b-[1px] border-b-[#10c3e2]'>
          <EditableText
            name='title'
            placeholder='Minha História...'
            value={editingStory.title || ''}
            onChange={(value) => handleChangeValue('title', value)}
          />
        </div>

        <div className='flex-1 px-3 flex flex-col gap-3'>
          <InputField
            label='Tema:'
            name='themes'
            placeholder='Sobre o que é a sua história?'
            value={editingStory.themes || ''}
            onChange={(value) => handleChangeValue('themes', value as string)}
          />

          <InputField
            label='Objetivos:'
            name='objectives'
            placeholder='Quais seus objetivos ao escrever essa história?'
            value={editingStory.objectives || ''}
            onChange={(value) =>
              handleChangeValue('objectives', value as string)
            }
          />

          <InputField
            label='Trama principal:'
            name='mainPlot'
            placeholder='Qual a jornada principal? O que os protagonistas buscam?'
            value={editingStory.mainPlot || ''}
            onChange={(value) => handleChangeValue('mainPlot', value as string)}
          />

          <InputField
            label='Gêneros:'
            name='genres'
            placeholder='Em quais gêneros você acredita que sua história se encaixa?'
            value={editingStory.genres || ''}
            onChange={(value) => handleChangeValue('genres', value as string)}
          />

          <InputField
            label='Ambientação:'
            name='setting'
            placeholder='Qual o tipo de mundo no qual sua história se passa?'
            value={editingStory.setting || ''}
            onChange={(value) => handleChangeValue('setting', value as string)}
          />

          <TextArea
            className='flex-1 w-full'
            name='summary'
            placeholder='Descreva um pouco sua história...'
            value={editingStory.summary || ''}
            onChange={(value) => handleChangeValue('summary', value as string)}
          />
        </div>

        <div className='w-full p-2 flex justify-end items-center gap-3'>
          <ConfirmButton>Salvar</ConfirmButton>
          <Link href={story ? `/story/${story.id}/timeline` : '/story'}>
            <DangerButton>Cancelar</DangerButton>
          </Link>
        </div>
      </div>

      <div className='w-1/3 h-full hover:bg-[#d9d9d9] rounded-3xl group duration-500 flex justify-center items-center'>
        <ImageIcon
          size={48}
          className='text-gray-400 group-hover:text-[#707070]'
        />
      </div>
    </form>
  )
}

type EditingStory = {
  title?: string
  themes?: string
  objectives?: string
  mainPlot?: string
  genres?: string
  setting?: string
  summary?: string
}
