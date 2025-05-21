import MainHeader from './components/MainHeader'
import SideBar from './components/SideBar'

import style from './MainLayout.module.css'

export default function MainLayout({ children }: Readonly<Props>) {
  return (
    <div className={style.root}>
      <MainHeader className={style.header} />

      <SideBar className={style.sideBar} />

      <main className={style.content}>{children}</main>
    </div>
  )
}

type Props = { children: React.ReactNode }
