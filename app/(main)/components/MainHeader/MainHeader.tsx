import { Mr_Dafoe } from 'next/font/google'
import AuthorInfo, { Orientation } from '../AuthorInfo'
import style from './Header.module.css'

const mrDafoe = Mr_Dafoe({ weight: '400', subsets: ['latin'] })

export default function MainHeader({ className, pageTitle }: Props) {
  return (
    <header className={ ` ${className} ${style.header}` }>
      <h2 className={ mrDafoe.className }>
        Writer&apos;s Mind
      </h2>

      {pageTitle && <h3>{pageTitle}</h3>}

      <AuthorInfo orientation={ Orientation.LEFT } />
    </header>
  )
}

type Props = { className?: string, pageTitle?: string }
