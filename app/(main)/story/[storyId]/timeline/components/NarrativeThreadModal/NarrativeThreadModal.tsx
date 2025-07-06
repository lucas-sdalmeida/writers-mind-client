'use client'

import { InputField } from '@/app/(main)/components/InputField'
import { ConfirmButton, DangerButton } from '@/app/(main)/components/Button'
import { useState } from 'react'
import { useSelectionContext } from '../../context/SelectionContext'
import { useTimelineContext } from '../../context/TimeLineContext'
import { useAuthorId } from '@/app/(main)/story/hooks/useAuthorId'
import { postNarrativeThread } from '../../api/postNarrativeThread'

export default function NarrativeThreadModal() {
  const authorId = useAuthorId()

  const { timeline, dispatch } = useTimelineContext()
  const { selectionState, clear, stopAddingThread } = useSelectionContext()
  const [title, setTitle] = useState('')

  const handleOnSave = async () => {
    const { narrativeThread: thread } = await postNarrativeThread(
      authorId!,
      timeline.storyId,
      {
        title,
        lines: selectionState.selectedLines.map((l) => l.line),
      },
    )

    dispatch({
      type: 'new-narrative-thread',
      thread,
      lines: selectionState.selectedLines.map((l) => l.line),
    })
    clear()
  }

  if (!selectionState.addingNarrativeThread) return <></>

  return (
    <div className='p-3 rounded-xl shadow-md bg-white flex flex-col items-center gap-4 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <InputField
        label='Título'
        name='narrativeThreadTitle'
        value={title}
        onChange={(v) => setTitle(v as string)}
      />

      <div className='w-full flex justify-center gap-3'>
        <ConfirmButton onClick={handleOnSave}>Salvar</ConfirmButton>

        <DangerButton onClick={() => stopAddingThread()}>Cancelar</DangerButton>
      </div>
    </div>
  )
}
