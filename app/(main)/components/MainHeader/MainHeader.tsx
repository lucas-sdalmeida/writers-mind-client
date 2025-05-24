import { Mr_Dafoe } from 'next/font/google'
import AuthorInfo, { Orientation } from '../AuthorInfo'

const mrDafoe = Mr_Dafoe({ weight: '400', subsets: ['latin'] })

export default function MainHeader() {
  return (
    <header className='w-full h-12 py-1 px-4 shadow-sm shadow-gray-300 flex justify-between items-center'>
      <h2 className={`${mrDafoe.className} text-black text-xl`}>Writer&apos;s Mind</h2>
      <AuthorInfo orientation={Orientation.LEFT} hidePseudonym={true} />
    </header>
  )
}
