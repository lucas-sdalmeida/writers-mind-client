import style from './BiographyTab.module.css'

export default function BiographyTab() {
  return (
    <div className={ style.biographyTab }>
      <header className={ style.header }>
        <h2>Biografia</h2>
        <div className={ style.seeTimeLine }>
          <p>Ver linha do tempo</p>
        </div>
      </header>

      <ul className={ style.biographyPoints }>
        <li className={ style.mark }>
          <h5>Trecho A</h5>
        </li>
        <li className={ style.mark }>
          <h5>Trecho A</h5>
        </li>
        <li className={ style.mark }>
          <h5>Trecho A</h5>
        </li>
      </ul>
    </div>
  )
}
