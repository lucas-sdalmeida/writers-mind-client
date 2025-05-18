import style from './CharactersPage.module.css'

export default function CharactersPage() {
  return (
    <div className={ style.charactersPage }>
      <header className={ style.header }>
        <h2>Personagens</h2>
      </header>

      <div className={ style.charactersList }>
        <div className={ style.characterCard }>
          <div className={ style.characterDrawing }>

          </div>

          <div className={ style.characterDescription }>
            <h4>Personagem 1</h4>
            <p>Era uma vez...</p>
          </div>

          <div className={ style.deleteCharacter }>

          </div>
        </div>
      </div>
    </div>
  )
}
