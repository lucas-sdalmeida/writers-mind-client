'use client'

import { useState } from 'react'
import style from './StoryForm.module.css'
import { useRouter } from 'next/navigation'
import { updateStory } from '../../api/update-story'
import Story from '@/app/(main)/story/api/story'

export default function StoryForm({ story }: Readonly<Props>) {
  const router = useRouter()
  const [editingStory, setEditingStory] = useState(
    story ?? ({} as EditingStory),
  )

  const handlePut = async () => {
    try {
      await updateStory({
        ...editingStory,
        id: story?.id ?? '',
        title: editingStory?.title ?? story?.title ?? '',
      })
      router.push('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={style.storyForm}>
      <div className={style.drawing}>
        <input
          form='storyForm'
          type='image'
          value={editingStory?.coverDrawing ?? ''}
          onChange={(e) =>
            setEditingStory({ ...editingStory, coverDrawing: e.target.value })
          }
        />
      </div>

      <section className={style.storyInfo}>
        <header className={style.header}>
          <input
            className={style.titleField}
            form='storyForm'
            type='text'
            placeholder='História A'
            value={editingStory?.title ?? ''}
            onChange={(e) =>
              setEditingStory({ ...editingStory, title: e.target.value })
            }
          />
        </header>

        <form
          id='storyForm'
          className={style.form}
          onSubmit={async (e) => {
            e.preventDefault()
            if (story) {
              await handlePut()
              return
            }
          }}
        >
          <div className={style.formFields}>
            <input
              type='text'
              name='objectives'
              placeholder='Qual o objetivo da sua história?'
              value={editingStory?.objectives ?? ''}
              onChange={(e) =>
                setEditingStory({ ...editingStory, objectives: e.target.value })
              }
            />

            <input
              type='text'
              name='themes'
              placeholder='Quais os temas abordados?'
              value={editingStory?.themes ?? ''}
              onChange={(e) =>
                setEditingStory({ ...editingStory, themes: e.target.value })
              }
            />

            <input
              type='text'
              name='mainPlot'
              placeholder='Qual a jornada principal? O que os protagonistas buscam?'
              value={editingStory?.mainPlot ?? ''}
              onChange={(e) =>
                setEditingStory({ ...editingStory, mainPlot: e.target.value })
              }
            />

            <input
              type='text'
              name='genres'
              placeholder='Em quais gêneros a história se encaixa melhor?'
              value={editingStory?.genres ?? ''}
              onChange={(e) =>
                setEditingStory({ ...editingStory, genres: e.target.value })
              }
            />

            <input
              type='text'
              name='setting'
              placeholder='Como é o mundo no qual ela se passa?'
              value={editingStory?.setting ?? ''}
              onChange={(e) =>
                setEditingStory({ ...editingStory, setting: e.target.value })
              }
            />

            <textarea
              name='summary'
              placeholder='Como você resumiria sua história?'
              value={editingStory?.summary ?? ''}
              onChange={(e) =>
                setEditingStory({ ...editingStory, summary: e.target.value })
              }
            ></textarea>
          </div>
          <div className={style.formControls}>
            <button>Salvar</button>
          </div>
        </form>
      </section>
    </div>
  )
}

type Props = {
  story?: Story
}

type EditingStory = {
  title?: string
  coverDrawing?: string
  objectives?: string
  themes?: string
  mainPlot?: string
  genres?: string
  setting?: string
  summary?: string
}
