import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function SelectField({
  label,
  name,
  value,
  defaultValue,
  options,
  onChange,
}: Readonly<Props>) {
  return (
    <label className={`${quicksand.className} flex items-center gap-3`}>
      {label && <span>{label}</span>}
      <select
        className='flex-1 px-2 py-1 rounded-lg border-[1px] border-gray-300 outline-gray-400 outline-1 bg-transparent placeholder-gray-400'
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {Object.keys(options).map((o) => (
          <option key={o} value={o}>
            {options[o]}
          </option>
        ))}
      </select>
    </label>
  )
}

type Props = {
  type?: string
  label?: string
  name?: string
  value?: string | number
  defaultValue?: number | string
  options: { [value: string | number]: string }
  onChange?: (value: string | number) => void
}
