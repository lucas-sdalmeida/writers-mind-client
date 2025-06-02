import { Trash2 } from 'lucide-react'

export default function AttributesTab({
  character,
  setCharacter,
}: Readonly<Props>) {
  const handleOnChangeName = (previousName: string, value: string) => {
    const attributes = character.attributes.map((a) =>
      a.attributeName !== previousName
        ? a
        : { attributeName: value, value: a.value },
    )
    setCharacter({ ...character, attributes })
  }

  const handleOnChangeValue = (attributeName: string, value: string) => {
    const attributes = character.attributes.map((a) =>
      a.attributeName !== attributeName ? a : { attributeName, value },
    )
    setCharacter({ ...character, attributes })
  }

  const handleAddAttribute = () => {
    if (character.attributes.some((a) => a.attributeName === '')) return
    setCharacter({
      ...character,
      attributes: [...character.attributes, { attributeName: '', value: '' }],
    })
  }

  const handleDeleteAttribute = (attributeName: string) => {
    setCharacter({
      ...character,
      attributes: character.attributes.filter(
        (a) => a.attributeName !== attributeName,
      ),
    })
  }

  return (
    <div className='w-full h-full'>
      <h3 className='w-full my-2 text-sm text-center'>Características</h3>

      <ul className='w-full h-fit max-h-[60dvh] mb-4 list-none overflow-y-auto'>
        <NameAttribute
          key={-1}
          character={character}
          setCharacter={setCharacter}
        />

        {character.attributes.map((a, i) => {
          return (
            <AttributeItem
              index={i}
              attribute={a}
              onChangeName={handleOnChangeName}
              onChangeValue={handleOnChangeValue}
              onDeleteAttribute={handleDeleteAttribute}
            />
          )
        })}
      </ul>

      <div className='w-full flex justify-center'>
        <p
          className='text-sm text-[#10c3e2] hover:text-cyan-600 hover:underline cursor-pointer'
          onClick={handleAddAttribute}
        >
          Adicionar característica
        </p>
      </div>
    </div>
  )
}

type Props = {
  character: CharacterDraft
  setCharacter: (value: CharacterDraft) => void
}

type CharacterDraft = {
  name?: string
  attributes: { attributeName: string; value: string }[]
}

function NameAttribute({ character, setCharacter }: Props) {
  return (
    <li className='w-full mb-2 last:mb-0'>
      <div className='w-full grid grid-cols-6 grid-rows-1 gap-3'>
        <input
          className='col-span-2 px-2 border-b-[1px] border-b-[#10c3e2] bg-transparent'
          type='text'
          disabled
          value='Nome'
        />

        <input
          className='col-span-3 flex-grow-[3] px-2 border-b-[1px] border-b-[#10c3e2] outline-[1px] outline-gray-400 bg-transparent'
          type='text'
          value={character.name ?? ''}
          onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        />
      </div>
    </li>
  )
}

function AttributeItem({
  index,
  attribute,
  onChangeName,
  onChangeValue,
  onDeleteAttribute,
}: AttributeItemProps) {
  const { attributeName, value } = attribute

  return (
    <li key={index} className='w-full mb-2 last:mb-0'>
      <div className='w-full grid grid-cols-6 grid-rows-1 gap-3'>
        <input
          className='col-span-2 px-2 border-b-[1px] border-b-[#10c3e2] outline-[1px] outline-gray-400 bg-transparent'
          type='text'
          value={attributeName}
          onChange={(e) => onChangeName(attributeName, e.target.value)}
        />

        <input
          className='col-span-3 flex-grow-[3] px-2 border-b-[1px] border-b-[#10c3e2] outline-[1px] outline-gray-400 bg-transparent'
          type='text'
          value={value}
          onChange={(e) => onChangeValue(attributeName, e.target.value)}
        />

        <div className='col-span-1 w-full'>
          <Trash2
            size={20}
            className='mx-auto text-[#e21010] hover:text-[#a21010]'
            onClick={() => onDeleteAttribute(attributeName)}
          />
        </div>
      </div>
    </li>
  )
}

type AttributeItemProps = {
  index: number
  attribute: { attributeName: string; value: string }
  onChangeName: (currentName: string, newName: string) => void
  onChangeValue: (attributeName: string, value: string) => void
  onDeleteAttribute: (attributeName: string) => void
}
