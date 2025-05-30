export default function DangerButton({ children, onClick }: Readonly<Props>) {
  return (
    <button
      className='px-3 py-1 rounded-xl bg-[#e21010] hover:bg-[#a21010] text-white hover:underline'
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
