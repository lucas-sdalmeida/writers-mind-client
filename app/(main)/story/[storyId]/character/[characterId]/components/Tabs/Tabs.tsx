'use client'

import { useState } from 'react'
import style from './Tabs.module.css'

export default function Tabs({ tabs, className }: Readonly<{ tabs: React.ReactNode[], className?: string }>) {
  const [tab, setTab] = useState(0)

  return (
    <div className={ `${className} ${style.tabs}` }>
      <div className={ style.content }>
        { tabs[tab] }
      </div>
      <div className={ style.options }>
        <button onClick={ () => setTab(Math.max(tab - 1, 0)) }>Anterior</button>
        <button onClick={ () => setTab(Math.min(tab + 1, tabs.length - 1)) }>Próximo</button>
      </div>
    </div>
  )
}
