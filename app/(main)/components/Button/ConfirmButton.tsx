'use client'

import { FormEvent } from 'react'

export default function ConfirmButton({
  children,
  className,
  onClick,
  onSubmit,
}: Readonly<Props>) {
  return (
    <button
      className={`px-3 py-1 rounded-xl bg-[#10c3e2] hover:bg-cyan-600 text-white hover:underline ${className}`}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  )
}

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onSubmit?: (e: FormEvent<HTMLButtonElement>) => void
}
