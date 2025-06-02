import { X } from 'lucide-react'

export default function Modal({ children, onCancel }: Readonly<Props>) {
  return (
    <div className='w-dvw h-dvh bg-black bg-opacity-50 fixed z-[99] top-0'>
      <div className='w-3/4 h-[90%] rounded-3xl bg-[#f6f6f6] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {children}
      </div>

      <button
        className='bg-transparent text-gray-300 hover:text-gray-400 text-3xl margin-2 absolute top-0 left-full -translate-x-full'
        onClick={onCancel}
      >
        <X size={36} />
      </button>
    </div>
  )
}

type Props = {
  children: React.ReactNode
  onCancel?: () => void
}
