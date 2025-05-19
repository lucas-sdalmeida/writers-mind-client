import ProfilePicture from '../../components/ProfilePicture'
import style from './AuthorPage.module.css'

export default function AuthorPage() {
  return (
    <div className={ style.authorPage }>
      <header className={ style.header }>
        <h2>Minha conta</h2>
      </header>

      <div className={ style.authorData }>
        <div className={ style.card }>
          <div>
            <h5>Nome</h5>
            <p>Fulano</p>
          </div>
          <div>
            <h5>Pseudônimo</h5>
            <p>Nenhum</p>
          </div>
          <div className={ style.picture }>
            <ProfilePicture src='https://picsum.photos/seed/profile/48' />
          </div>
        </div>

        <div className={ style.card }>
          <div>
            <h5>Email</h5>
            <p>fulano@gmail.com</p>
          </div>
          <div>
            <h5>Nome de Usuário</h5>
            <p>fulano100</p>
          </div>
          <div>
            <h5>Senha</h5>
            <p>********</p>
          </div>
        </div>
      </div>

      <div className={ style.footer }>
        <button className={ style.dangerButton }>EXCLUIR CONTA</button>
      </div>
    </div>
  )
}
