'use client'

import { Inter } from 'next/font/google'
import { PenSquare } from 'lucide-react'

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default function EditableText({
  name,
  placeholder,
  value,
  onChange,
}: Readonly<Props>) {
  return (
    <label className={`${inter.className} flex items-start gap-1`}>
      <input
        className='min-w-72 w-auto rounded-md bg-transparent outline-none placeholder-gray-400'
        type='text'
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <PenSquare size={14} />
    </label>
  )
}

type Props = {
  name?: string
  placeholder?: string
  value?: string
  onChange?: () => void
}
