import AuthorInfo, { Orientation } from '../AuthorInfo'
import style from './SideBar.module.css'

export default function SideBar({ className }: Readonly<{ className?: string }>) {
  return (
    <nav className={ ` ${className} ${style.sideBar}` }>
      <div className={ style.header }>
        <AuthorInfo orientation={ Orientation.RIGHT } />
      </div>

      <ul className={ style.optionsList }>
        <li className={ style.selected }>Salão das Histórias</li>
        <li>Lixeira</li>
      </ul>

      <div className={ style.footer }>
        <button className={ style.logoutButton }>Sair</button>
      </div>
    </nav>
  )
}
