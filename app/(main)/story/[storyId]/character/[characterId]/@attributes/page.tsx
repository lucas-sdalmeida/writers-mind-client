import style from './AttributesTab.module.css'

export default function AttributesTab() {
  return (
    <div className={ style.attributesTab }>
      <header className={ style.header }>
        <h2>Características</h2>
      </header>

      <div className={ style.card }>
        <div className={ style.cardHeader }>
          <h4>Característica</h4>
          <h4>Valor</h4>
        </div>

        <ul className={ style.attributesList }>
          <li className={ style.attribute }>
            <input type="text" name='nameKey' value='Nome' disabled/>
            <input type="text" name="nameValue" />
          </li>
        </ul>

        <p className={ style.addMore }>Adicionar Característica</p>
      </div>
    </div>
  )
}
