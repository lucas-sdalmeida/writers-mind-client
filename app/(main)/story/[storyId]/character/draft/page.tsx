'use client'

import { Quicksand } from 'next/font/google'

import { ImageIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { EditableText } from '@/app/(main)/components/InputField'
import { ConfirmButton, DangerButton } from '@/app/(main)/components/Button'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function CharacterDraftPage() {
  const [character, setCharacter] = useState({
    attributes: [],
  } as CharacterDraft)

  const handleOnChangeAttributeName = (previousName: string, value: string) => {
    const attributes = character.attributes.map((a) =>
      a.attributeName !== previousName
        ? a
        : { attributeName: value, value: a.value },
    )
    setCharacter({ ...character, attributes })
  }

  const handleOnChangeAttributeValue = (
    attributeName: string,
    value: string,
  ) => {
    const attributes = character.attributes.map((a) =>
      a.attributeName !== attributeName ? a : { attributeName, value },
    )
    setCharacter({ ...character, attributes })
  }

  const handleAddAttribute = () => {
    if (character.attributes.some((a) => a.attributeName === '')) return
    setCharacter({
      ...character,
      attributes: [...character.attributes, { attributeName: '', value: '' }],
    })
  }

  const handleDeleteAttribute = (attributeName: string) => {
    setCharacter({
      ...character,
      attributes: character.attributes.filter(
        (a) => a.attributeName !== attributeName,
      ),
    })
  }

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

        <div className={`${quicksand.className} flex-1 w-full h-full`}>
          <div className='w-full h-full'>
            <h3 className='w-full my-2 text-sm text-center'>Características</h3>

            <ul className='w-full mb-4 list-none'>
              <li className='w-full mb-2 last:mb-0'>
                <div className='w-full grid grid-cols-6 grid-rows-1 gap-3'>
                  <input
                    className='col-span-2 px-2 border-b-[1px] border-b-[#10c3e2] bg-transparent'
                    type='text'
                    disabled
                    value='Nome'
                  />

                  <input
                    className='col-span-3 flex-grow-[3] px-2 border-b-[1px] border-b-[#10c3e2] outline-[1px] outline-gray-400 bg-transparent'
                    type='text'
                    value={character.name ?? ''}
                    onChange={(e) =>
                      setCharacter({ ...character, name: e.target.value })
                    }
                  />
                </div>
              </li>

              {character.attributes.map((a, i) => {
                return (
                  <li key={i} className='w-full mb-2 last:mb-0'>
                    <div className='w-full grid grid-cols-6 grid-rows-1 gap-3'>
                      <input
                        className='col-span-2 px-2 border-b-[1px] border-b-[#10c3e2] outline-[1px] outline-gray-400 bg-transparent'
                        type='text'
                        value={a.attributeName}
                        onChange={(e) =>
                          handleOnChangeAttributeName(
                            a.attributeName,
                            e.target.value,
                          )
                        }
                      />

                      <input
                        className='col-span-3 flex-grow-[3] px-2 border-b-[1px] border-b-[#10c3e2] outline-[1px] outline-gray-400 bg-transparent'
                        type='text'
                        value={a.value}
                        onChange={(e) =>
                          handleOnChangeAttributeValue(
                            a.attributeName,
                            e.target.value,
                          )
                        }
                      />

                      <div className='col-span-1 w-full'>
                        <Trash2
                          size={20}
                          className='mx-auto text-[#e21010] hover:text-[#a21010]'
                          onClick={() => handleDeleteAttribute(a.attributeName)}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className='w-full flex justify-center'>
              <p
                className='text-sm text-[#10c3e2] hover:text-cyan-600 hover:underline cursor-pointer'
                onClick={handleAddAttribute}
              >
                Adicionar característica
              </p>
            </div>
          </div>
        </div>

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
  attributes: { attributeName: string; value: string }[]
}
