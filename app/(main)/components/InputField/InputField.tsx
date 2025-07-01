import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function InputField({
  type,
  label,
  name,
  placeholder,
  value,
  className,
  onChange,
}: Readonly<Props>) {
  return (
    <label
      className={`${quicksand.className} flex items-center gap-3 ${className}`}
    >
      {label && <span>{label}</span>}
      <input
        className='flex-1 px-2 py-1 rounded-lg border-[1px] border-gray-300 outline-gray-400 outline-1 bg-transparent placeholder-gray-400'
        type={type ?? 'text'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </label>
  )
}

type Props = {
  type?: string
  label?: string
  name?: string
  placeholder?: string
  value?: number | string | readonly string[]
  className?: string
  onChange?: (value: number | string | readonly string[]) => void
}
