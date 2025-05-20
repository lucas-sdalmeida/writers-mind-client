'use client'

import { ChangeEvent, useState } from 'react'
import style from './AttributesTab.module.css'

export default function AttributesTab() {
  const [attributes, setAttributes] = useState([] as { index: number, key: string, value: string }[])

  const handleAddAttribute = () => {
    setAttributes([...attributes, { index: attributes.length, key: '', value: '' }])
  }

  const handleDeleteAttribute = (i: number) => {
    setAttributes(attributes.filter(a => a.index !== i))
  }

  const handleChangeAttribute = (
    index: number,
    field: 'key' | 'value',
    newValue: string
  ) => {
    setAttributes(prev =>
      prev.map(attr => attr.index === index ? { ...attr, [field]: newValue } : attr)
        .sort((a, b) => Math.min(Math.max(a.index - b.index, -1), 1))
    );
  };

  return (
    <div className={ style.attributesTab }>
      <header className={ style.header }>
        <h2>Características</h2>
        <button className={ style.saveButton }>Salvar</button>
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

          {
            attributes.map(({index,key, value}) => (
              <li key={ index } className={ style.attribute }>
                <input type="text" value={ key } onChange={ (e) => handleChangeAttribute(index, 'key', e.target.value) } />
                <input type="text" />
                <button className={ style.deleteButton } onClick={ () => handleDeleteAttribute(index) }>Delete</button>
              </li>
            ))
          }
        </ul>

        <p className={ style.addMore } onClick={ handleAddAttribute }>Adicionar Característica</p>
      </div>
    </div>
  )
}
