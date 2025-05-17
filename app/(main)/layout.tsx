import Header from './components/Header'
import SideBar from './components/SideBar'

import style from './MainLayout.module.css'

export default function MainLayout({ children }: Readonly<Props>) {
  return (
    <div className={ style.root }>
      <Header className={ style.header } />

      <SideBar className={ style.sideBar } />

      <main className={ style.content }>
        {children}
      </main>
    </div>
  )
}

type Props = { children: React.ReactNode }
