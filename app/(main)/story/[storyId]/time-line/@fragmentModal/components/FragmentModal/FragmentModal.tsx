'use client'

import {
  EditableText,
  InputField,
  TextArea,
} from '@/app/(main)/components/InputField'
import { ConfirmButton } from '@/app/(main)/components/Button'
import Modal from '../Modal'
import { useRouter } from 'next/navigation'

export default function FragmentModal() {
  const router = useRouter()

  return (
    <Modal onCancel={() => router.back()}>
      <div className='size-full rounded-3xl bg-zinc-400 grid grid-cols-5 grid-rows-1'>
        <div className='col-span-3 w-full h-full rounded-l-3xl'></div>
        <div className='col-span-2 w-full h-full px-6 pt-10 pb-4 rounded-r-3xl shadow-[-4px_0_4px_#00000040] bg-[#f6f6f6] flex flex-col gap-5'>
          <div className='w-full px-1 pb-1 mb-1 border-b-[1px] border-b-[#10c3e2]'>
            <EditableText placeholder='Trecho...' />
          </div>

          <div className='flex-1 w-full'>
            <InputField name='moment' type='datetime-local' label='Momento:' />

            <TextArea
              className='w-full mt-3'
              name='description'
              placeholder='Conte mais sobre esse trecho...'
            />
          </div>

          <div className='w-full flex justify-center'>
            <ConfirmButton>Salvar</ConfirmButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}
