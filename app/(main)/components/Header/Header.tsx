import { Mr_Dafoe } from 'next/font/google'
import style from './header.module.css'

const mrDafoe = Mr_Dafoe({ weight: '400', subsets: ['latin'] })

export default function Header({ pageTitle }: Props) {
  return (
    <header className={style.header}>
      <h2 className={`${style.logo} ${mrDafoe.className}`}>
        Writer&apos;s Mind
      </h2>
      {pageTitle && <h3>{pageTitle}</h3>}
    </header>
  )
}

type Props = { pageTitle?: string }
