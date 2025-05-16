import { Mr_Dafoe } from 'next/font/google'
import style from './header.module.css'
import ProfilePicture from '../ProfilePicture'

const mrDafoe = Mr_Dafoe({ weight: '400', subsets: ['latin'] })

export default function Header({ className, pageTitle }: Props) {
  return (
    <header className={ ` ${className} ${style.header}` }>
      <h2 className={`${style.logo} ${mrDafoe.className}`}>
        Writer&apos;s Mind
      </h2>
      {pageTitle && <h3>{pageTitle}</h3>}
      <div className={style.currentUser}>
        <p className={style.username}>User</p>
        <ProfilePicture
          src='https://picsum.photos/seed/profile/40'
          radius={40}
        />
      </div>
    </header>
  )
}

type Props = { className?: string, pageTitle?: string }
