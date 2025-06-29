'use client'

export default function TimeLine({ className }: Readonly<Props>) {
  return <div className={`${className} flex items-center`}></div>
}

type Props = {
  story: { id: string; title: string }
  className?: string
}
