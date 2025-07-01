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
import type { Chapter } from '../../api/getChapter'
import { Point } from '../../../context/timeline'
import { postFragment } from '../../api/postFragment'
import { putFragment } from '../../api/putFragment'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function FragmentModal({ fragment: fragment }: Readonly<Props>) {
  const router = useRouter()

  const { timeline, addingPointData, dispatch } = useTimelineContext()
  const [editingFragment, setEditingFragment] = useState<EditingFragment>(
    fragment
      ? {
          ...fragment,
          momentDate: fragment.momentDate?.toISOString(),
          momentTime: fragment.momentTime?.toISOString(),
        }
      : {
          type: 'excerpt',
        },
  )
  const [innerExcerpt, setInnerExcerpt] = useState<EditingFragment | undefined>(
    fragment && fragment.type === 'chapter' ? { type: 'excerpt' } : undefined,
  )
  const [error, setError] = useState(undefined as string | undefined)

  const handleTypeChange = (type: 'excerpt' | 'chapter') => {
    setEditingFragment({ ...editingFragment, type })
    setInnerExcerpt(type === 'chapter' ? { type: 'excerpt' } : undefined)
  }

  const saveFragment = async () => {
    if (!editingFragment.title || editingFragment.title === '') {
      setError('O título é obrigatório')
      return
    }
    if (
      editingFragment.type === 'chapter' &&
      (!innerExcerpt?.title || innerExcerpt.title === '')
    ) {
      setError('O título do novo trecho do capítulo é obrigatório!')
      return
    }

    router.back()
    const data = addingPointData.current!

    const id = !fragment
      ? ('' + Math.random() * 1000).replace('.', '-')
      : fragment.id

    const point = {
      id,
      storyId: timeline.storyId,
      volumeId: data.volumeId,
      characterId: data.characterId,
      chapterId: data.chapterId,
      type: editingFragment.type,
      title: editingFragment.title!,
      actualPosition:
        editingFragment.type === 'excerpt'
          ? data.position
          : { ...data.position, width: 1 },
    }

    const chapterPoint =
      editingFragment.type === 'excerpt'
        ? undefined
        : ({
            id: ('' + Math.random() * 1000).replace('.', '-'),
            storyId: timeline.storyId,
            volumeId: data.volumeId,
            characterId: data.characterId,
            chapterId: id,
            title: innerExcerpt!.title!,
            type: 'excerpt',
            actualPosition: { ...data.position, x: data.position.x + 0.2 },
          } as Point)

    const fragmentRequest = {
      ...editingFragment,
      ...point,
      position: point.actualPosition,
      momentDate: editingFragment.momentDate
        ? new Date(editingFragment.momentDate)
        : undefined,
      momentTime: editingFragment.momentTime
        ? new Date(editingFragment.momentTime)
        : undefined,
      content:
        editingFragment.type === 'chapter'
          ? undefined
          : editingFragment.content,
    }
    const fragmentPromise = !fragment
      ? postFragment(timeline.storyId, fragmentRequest)
      : putFragment(point.id, fragmentRequest)

    const innerFragmentRequest = innerExcerpt && {
      ...innerExcerpt,
      ...chapterPoint!,
      position: chapterPoint!.actualPosition,
      momentDate: innerExcerpt.momentDate
        ? new Date(innerExcerpt.momentDate)
        : undefined,
      momentTime: innerExcerpt.momentTime
        ? new Date(innerExcerpt.momentTime)
        : undefined,
      content: editingFragment.content,
    }
    const innerFragmentPromise = innerFragmentRequest
      ? postFragment(timeline.storyId, innerFragmentRequest)
      : Promise.resolve()

    await Promise.all([fragmentPromise, innerFragmentPromise])

    dispatch({
      type: 'add-point',
      point: point,
      chapterPoint: chapterPoint,
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
              disabled={fragment != undefined}
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

      {error && (
        <div
          className={`${quicksand.className} px-2 py-1 rounded-lg shadow-md text-white bg-[#e21010] fixed left-1 top-2`}
        >
          {error}
        </div>
      )}
    </Modal>
  )
}

type Props = {
  fragment?: Chapter
}

type EditingFragment = {
  title?: string
  type: 'excerpt' | 'chapter'
  summary?: string
  momentDate?: string
  momentTime?: string
  content?: string
}
