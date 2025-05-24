import { Inter, Quicksand } from "next/font/google"
import Link from "next/link"

const inter = Inter({ weight: '600', subsets: ['latin'] })
const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default async function HomePage() {
  return (
    <section className='w-full max-w-screen-xl h-full mx-auto px-6 pt-10 pb-6'>
      <header className='w-full px-1 border-b-[1px] border-b-[#10c3e2] flex justify-between'>
        <h2 className={`${inter.className} text-[#444444] text-2xl`}>Salão das Histórias</h2>

        <div className={`${quicksand.className} text-sm flex gap-2 items-center`}>
          <Link href='/story/trash' className='text-[#e21010] no-underline hover:underline'>Lixeixa</Link>
          <Link href='/story/draft' className='text-[#10c3e2] no-underline hover:underline'>Adicionar História</Link>
        </div>
      </header>

      <div className="w-full px-1 py-4 flex gap-3 flex-wrap">

      </div>
    </section>
  )
}
