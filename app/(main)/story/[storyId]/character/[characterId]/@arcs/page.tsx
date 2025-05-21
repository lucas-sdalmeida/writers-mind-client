import style from './ArcsTab.module.css'

export default function ArcsTab() {
  return (
    <div className={style.arcsTab}>
      <header className={style.header}>
        <h2>Arcos de Desenvolvimento</h2>
      </header>

      <div className={style.card}>
        <div className={style.arcsList}>
          <ul>
            <li className={style.arc}>
              <div>
                <h5>Arco A</h5>
                <p className={style.clickableText}>Ver na linha do tempo</p>
              </div>
            </li>
            <li className={style.arc}>
              <div>
                <h5>Arco A</h5>
                <p className={style.clickableText}>Ver na linha do tempo</p>
              </div>
            </li>
            <li className={style.arc}>
              <div>
                <h5>Arco A</h5>
                <p className={style.clickableText}>Ver na linha do tempo</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={style.addMore}>
          <p className={style.clickableText}>Novo Arco</p>
        </div>
      </div>
    </div>
  )
}
