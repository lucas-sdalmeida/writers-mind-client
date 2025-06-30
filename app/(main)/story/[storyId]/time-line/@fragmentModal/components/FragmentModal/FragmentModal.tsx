'use client'

import { Quicksand } from 'next/font/google'

import {
  EditableText,
  InputField,
  TextArea,
  SelectField,
} from '@/app/(main)/components/InputField'

import { ConfirmButton } from '@/app/(main)/components/Button'
import Modal from '../Modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTimelineContext } from '../../../context/TimeLineContext'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function FragmentModal() {
  const router = useRouter()

  const { addingPointData, dispatch } = useTimelineContext()
  const [editingFragment, setEditingFragment] = useState<EditingFragment>({
    type: 'excerpt',
  })
  const [innerExcerpt, setInnerExcerpt] = useState<EditingFragment | undefined>(
    undefined,
  )

  const handleTypeChange = (type: 'excerpt' | 'chapter') => {
    setEditingFragment({ ...editingFragment, type })
    setInnerExcerpt(type === 'chapter' ? { type: 'excerpt' } : undefined)
  }

  const saveFragment = () => {
    router.back()

    const data = addingPointData.current!
    const id = ('' + Math.random() * 1000).replace('.', '-')

    dispatch({
      type: 'add-point',
      point: {
        id,
        volumeId: data.volumeId,
        characterId: data.characterId,
        chapterId: data.chapterId,
        type: editingFragment.type,
        title: editingFragment.title!,
        actualPosition:
          editingFragment.type === 'excerpt'
            ? data.position
            : { ...data.position, width: 1 },
      },
      chapterPoint:
        editingFragment.type === 'excerpt'
          ? undefined
          : {
              id: ('' + Math.random() * 1000).replace('.', '-'),
              volumeId: data.volumeId,
              characterId: data.characterId,
              chapterId: id,
              title: innerExcerpt!.title!,
              type: 'excerpt',
              actualPosition: { ...data.position, x: data.position.x + 0.2 },
            },
    })
  }

  return (
    <Modal onCancel={() => router.back()}>
      <div className='size-full rounded-3xl bg-zinc-400 grid grid-cols-5 grid-rows-1'>
        <div className='col-span-3 w-full h-full rounded-l-3xl flex justify-center items-center'>
          <textarea
            className={`${quicksand.className} w-3/5 h-[90%] px-4 py-3 outline-none shadow-md shadow-gray-600 bg-[#f6f6f6] text-sm resize-none`}
            placeholder='Era uma vez...'
            value={editingFragment.content ?? ''}
            onChange={(e) =>
              setEditingFragment({
                ...editingFragment,
                content: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className='col-span-2 w-full h-full px-6 pt-10 pb-4 rounded-r-3xl shadow-[-4px_0_4px_#00000040] bg-[#f6f6f6] flex flex-col gap-5'>
          <div className='w-full px-1 pb-1 mb-1 border-b-[1px] border-b-[#10c3e2]'>
            <EditableText
              placeholder={
                editingFragment.type === 'excerpt' ? 'Trecho...' : 'Capítulo...'
              }
              value={editingFragment.title ?? ''}
              onChange={(v) =>
                setEditingFragment({
                  ...editingFragment,
                  title: v as string,
                })
              }
            />
          </div>

          <div className='flex-1 w-full flex flex-col gap-3'>
            <SelectField
              name='type'
              label='Tipo:'
              value={editingFragment.type}
              options={{ excerpt: 'Trecho', chapter: 'Capítulo' }}
              onChange={(v) => handleTypeChange(v as 'excerpt' | 'chapter')}
            />

            <InputField
              name='momentDate'
              type='date'
              label='Data:'
              value={editingFragment.momentDate ?? ''}
              onChange={(v) =>
                setEditingFragment({
                  ...editingFragment,
                  momentDate: v as string,
                })
              }
            />

            <InputField
              name='momentTime'
              type='time'
              label='Hora:'
              value={editingFragment.momentTime ?? ''}
              onChange={(v) =>
                setEditingFragment({
                  ...editingFragment,
                  momentTime: v as string,
                })
              }
            />

            <TextArea
              className='w-full mt-3'
              name='summary'
              placeholder={`Conte mais sobre esse ${editingFragment.type === 'excerpt' ? 'trecho' : 'capítulo'}...`}
              value={editingFragment.summary ?? ''}
              onChange={(v) =>
                setEditingFragment({
                  ...editingFragment,
                  summary: v,
                })
              }
            />
          </div>

          {editingFragment.type === 'chapter' && innerExcerpt && (
            <>
              <div className='w-full px-1 pb-1 mb-1 border-b-[1px] border-b-[#10c3e2]'>
                <EditableText
                  name='innerExcerptName'
                  placeholder='Trecho do capítulo...'
                  value={innerExcerpt.title ?? ''}
                  onChange={(v) =>
                    setInnerExcerpt({
                      ...innerExcerpt,
                      title: v as string,
                    })
                  }
                />
              </div>

              <div className='flex-1 w-full flex flex-col gap-3'>
                <InputField
                  name='momentDate'
                  type='date'
                  label='Data:'
                  value={innerExcerpt.momentDate ?? ''}
                  onChange={(v) =>
                    setInnerExcerpt({
                      ...innerExcerpt,
                      momentDate: v as string,
                    })
                  }
                />

                <InputField
                  name='momentTime'
                  type='time'
                  label='Hora:'
                  value={innerExcerpt.momentTime ?? ''}
                  onChange={(v) =>
                    setInnerExcerpt({
                      ...innerExcerpt,
                      momentTime: v as string,
                    })
                  }
                />

                <TextArea
                  className='w-full mt-3'
                  name='summary'
                  placeholder='Conte mais sobre esse trecho...'
                  value={innerExcerpt.summary ?? ''}
                  onChange={(v) =>
                    setInnerExcerpt({
                      ...innerExcerpt,
                      summary: v,
                    })
                  }
                />
              </div>
            </>
          )}

          <div className='w-full flex justify-center'>
            <ConfirmButton onClick={saveFragment}>Salvar</ConfirmButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}

type EditingFragment = {
  title?: string
  type: 'excerpt' | 'chapter'
  summary?: string
  momentDate?: string
  momentTime?: string
  content?: string
}
