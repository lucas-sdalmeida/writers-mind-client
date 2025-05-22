import Link from 'next/link'
import AuthorInfo, { Orientation } from '../AuthorInfo'

export default function SideBar({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <nav className={`${className} px-3 border-t-[#10c3e2] border-t-[1px] shadow-[2px_4px_4px_2px_#00000040] bg-[#f6f6f6] flex flex-col`}>
      <div className='flex-grow-0 flex-shrink-0 py-3 mb-6 border-b-[#10c3e2] botder-b-[1px]'>
        <AuthorInfo orientation={Orientation.RIGHT} />
      </div>

      <ul className='flex-grow list-none'>
        <li className='mb-3 text-sm font-bold last:mb-0'>
          <Link href='/' className='text-emerald-600'>
            Salão das Histórias
          </Link>
        </li>
      </ul>

      <div className='flex flex-grow-0 flex-shrink-0 py-3 mb-6 border-t-[#10c3e2] border-t-[1px]'>
        <button className='border-none text-[#e21010] text-[.75rem] font-bold uppercase hover:text-[#a21010]'>Sair</button>
      </div>
    </nav>
  )
}
