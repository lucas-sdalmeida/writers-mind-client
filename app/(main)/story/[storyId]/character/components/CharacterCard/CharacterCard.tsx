import Link from 'next/link'
import style from './CharacterCard.module.css'

export default function CharacterCard({ character }: Readonly<Props>) {
  return (
    <div className={ style.characterCard }>
      <div className={ style.characterDrawing }>

      </div>

      <div className={ style.characterDescription }>
        <Link href={ `/story/${character.storyId}/character/${character.id}` } className={ style.characterLink }>
          <h4>{ character.name }</h4>
          <p>{ character.coverBiography }</p>
        </Link>
      </div>

      <div className={ style.deleteCharacter }>

      </div>
    </div>
  )
}

type Props = {
  character: {
    id: string,
    storyId: string,
    name: string,
    coverBiography: string,
  }
}
