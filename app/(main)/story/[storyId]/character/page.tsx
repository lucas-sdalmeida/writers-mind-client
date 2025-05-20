import CharacterCard from './components/CharacterCard'
import style from './CharactersPage.module.css'

export default function CharactersPage() {
  return (
    <div className={ style.charactersPage }>
      <header className={ style.header }>
        <h2>Personagens</h2>
      </header>

      <div className={ style.charactersList }>
        <CharacterCard character={{ id: '1', storyId: '1', name: 'Personagem 1', coverBiography: 'Era uma vez...' }} />
      </div>
    </div>
  )
}
