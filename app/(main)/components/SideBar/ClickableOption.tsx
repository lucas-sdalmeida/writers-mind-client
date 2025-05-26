'use client'

export default function ClickableOption({
  icon,
  onClick,
  children,
}: Readonly<Props>) {
  return (
    <span className='w-full flex items-center gap-1' onClick={onClick}>
      {icon}
      {children}
    </span>
  )
}

type Props = {
  icon?: React.ReactElement
  onClick: () => void
  children: React.ReactNode
}
