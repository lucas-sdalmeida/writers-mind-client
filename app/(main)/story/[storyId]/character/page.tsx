import { Plus } from "lucide-react"
import { Inter } from "next/font/google"

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default function CharactersPage() {
  return (
    <section className="w-full h-full px-8 flex flex-col gap-3">
      <header className="w-full px-1 border-b-[1px] border-b-[#10c3e2] flex justify-between items-center">
        <h2 className={`${inter.className} text-2xl`}>Salão dos Heróis</h2>

        <button className='border-none bg-transparent'>
          <Plus className='text-[#10c3e2] hover:text-cyan-600' />
        </button>
      </header>

      <div className="flex-1 w-full px-1 py-4 flex gap-3 overflow-y-auto">
        
      </div>
    </section>
  )
}
