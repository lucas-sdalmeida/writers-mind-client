'use client'

import { Quicksand } from 'next/font/google'

import { useState } from 'react'
import React from 'react'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function SideBar({
  className,
  children,
  header,
  selectedIndex,
}: Readonly<Props>) {
  const [selected, setSelected] = useState(selectedIndex)

  return (
    <nav
      className={`${className} h-full px-2 py-6 flex flex-col border-r-[1px] border-r-gray-300`}
    >
      {header && (
        <div className='w-full mb-3 px-2 pb-1 border-b-[1px] border-b-[#10c3e2] flex items-center gap-1'>
          {header}
        </div>
      )}

      <ul className={`${quicksand.className} list-none w-full`}>
        {React.Children.map(children, (child, index) => {
          return (
            <li
              key={index}
              className={`mb-2 last:mb-0 px-2 py-1 rounded-lg ${selected == index && 'text-emerald-600'} text-sm hover:underline hover:bg-gray-200`}
            >
              {child}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
  className?: string
  selectedIndex: number
}
