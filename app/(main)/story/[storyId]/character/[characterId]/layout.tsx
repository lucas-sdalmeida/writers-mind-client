import { Inter } from "next/font/google"
import { Image as ImageIcon, PenSquare } from "lucide-react"

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default async function CharacterLayout({
  params,
  attributes,
  biography,
  arcs,
}: Readonly<Props>) {
  const { characterId } = await params
  const character = await getCharacter(characterId)

  return (
    <div className='w-full h-full flex gap-3'>
      <section className="flex-1 px-8 flex flex-col gap-3">
        <header className="w-full px-1 border-b-[1px] border-b-[#10c3e2] flex items-start gap-3">
          <h2 className={`${inter.className} text-2xl`}>{ character.name }</h2>
          <PenSquare size={14} />
        </header>
      </section>

      <div className="w-1/3 h-full rounded-2xl flex justify-center items-center group hover:bg-[#d9d9d9] duration-500">
        <ImageIcon className="text-gray-400 group-hover:text-[#707070]" size={48} />
      </div>
    </div>
  )
}

type Props = {
  params: Promise<{ storyId: string, characterId: string }>
  arcs: React.ReactNode
  attributes: React.ReactNode
  biography: React.ReactNode
  dimensions: React.ReactNode
}

async function getCharacter(characterId: string) {
  return { id: characterId, name: 'Personagem' }
}
