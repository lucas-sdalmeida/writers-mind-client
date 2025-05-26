import Link from 'next/link'

export default function LinkOption({ icon, href, children }: Readonly<Props>) {
  return (
    <span className='w-full flex items-center gap-1'>
      {icon} <Link href={href}>{children}</Link>
    </span>
  )
}

type Props = {
  icon?: React.ReactElement
  href: string
  children: React.ReactNode
}
