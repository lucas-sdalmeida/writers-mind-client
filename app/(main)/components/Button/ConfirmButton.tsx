'use client'

export default function ConfirmButton({ children, onClick }: Readonly<Props>) {
  return (
    <button
      className='px-3 py-1 rounded-xl bg-[#10c3e2] hover:bg-cyan-600 text-white hover:underline'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

type Props = {
  children: React.ReactNode
  onClick?: () => void
}
