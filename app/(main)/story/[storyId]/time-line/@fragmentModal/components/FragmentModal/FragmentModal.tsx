'use client'

import { Quicksand } from 'next/font/google'

import {
  EditableText,
  InputField,
  TextArea,
} from '@/app/(main)/components/InputField'

import { ConfirmButton } from '@/app/(main)/components/Button'
import Modal from '../Modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSaveFragment } from '../../hooks/useSaveFragment'
import { useTimeLineContext } from '../../../context/TimeLineContext'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function FragmentModal() {
  const router = useRouter()
  const saveFragmentHook = useSaveFragment()

  const { timeLine } = useTimeLineContext()
  const [editingFragment, setEditingFragment] = useState<EditingFragment>({})

  const saveFragment = () => {
    router.back()
    saveFragmentHook({
      id: '',
      packId: timeLine.addingPoint?.lineGroup,
      type: 'excerpt',
      title: editingFragment.title!,
      summary: editingFragment.summary,
      momentDate: editingFragment.momentDate
        ? new Date(editingFragment.momentDate)
        : undefined,
      momentTime: editingFragment.momentTime
        ? new Date(editingFragment.momentTime)
        : undefined,
      actualPosition: timeLine.addingPoint!,
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
              placeholder='Trecho...'
              value={editingFragment.title ?? ''}
              onChange={(v) =>
                setEditingFragment({
                  ...editingFragment,
                  title: v as string,
                })
              }
            />
          </div>

          <div className='flex-1 w-full'>
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
              placeholder='Conte mais sobre esse trecho...'
              value={editingFragment.summary ?? ''}
              onChange={(v) =>
                setEditingFragment({
                  ...editingFragment,
                  summary: v,
                })
              }
            />
          </div>

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
  summary?: string
  momentDate?: string
  momentTime?: string
  content?: string
}
