import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function TextArea({
  className,
  name,
  placeholder,
  value,
  onChange,
}: Readonly<Props>) {
  return (
    <textarea
      className={`${quicksand.className} ${className} px-2 py-1 rounded-lg border-[1px] border-gray-300 outline-1 outline-gray-400 bg-transparent placeholder-gray-400`}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    ></textarea>
  )
}

type Props = {
  className?: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}
