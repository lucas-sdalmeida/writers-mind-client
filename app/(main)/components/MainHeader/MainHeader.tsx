import { Mr_Dafoe } from 'next/font/google'
import AuthorInfo, { Orientation } from '../AuthorInfo'

const mrDafoe = Mr_Dafoe({ weight: '400', subsets: ['latin'] })

export default function MainHeader({ className, pageTitle }: Props) {
  return (
    <header className={`${className} w-full h-12 py-1 px-4 shadow-md shadow-gray-400 bg-[#f6f6f6] flex justify-between items-center`}>
      <h2 className={`${mrDafoe.className} text-xl`}>Writer&apos;s Mind</h2>

      {pageTitle && <h3>{pageTitle}</h3>}

      <AuthorInfo orientation={Orientation.LEFT} />
    </header>
  )
}

type Props = { className?: string; pageTitle?: string }
