import Header from './components/Header'

import style from './main-layout.module.css'

export default function MainLayout({ children }: Readonly<Props>) {
  return (
    <div className={ style.mainLayout }>
      <Header className={ style.header } />

      <nav className={ style.sideBar }>
        <div>
          A
        </div>
        <div>
          <ul>
            <li>A</li>
          </ul>
        </div>
        <div>
          A
        </div>
      </nav>

      <main className={ style.main }>
        {children}
      </main>
    </div>
  )
}

type Props = { children: React.ReactNode }
