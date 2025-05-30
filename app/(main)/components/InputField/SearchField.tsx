'use client'

import { Quicksand } from 'next/font/google'
import { Search } from 'lucide-react'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function SearchField({
  value,
  onClick,
  className,
}: Readonly<Props>) {
  return (
    <label
      className={`${className} ${quicksand.className} flex items-center gap-1 group`}
    >
      <Search size={16} className='group-focus-within:w-0 duration-200' />

      <input
        className='py-1 bg-transparent placeholder-gray-400 text-ms outline-none'
        placeholder='Pesquisar'
        value={value}
        onClick={onClick}
      />
    </label>
  )
}

type Props = {
  value?: string
  onClick?: () => void
  className?: string
}
