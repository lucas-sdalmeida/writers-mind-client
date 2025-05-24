import MainHeader from './components/MainHeader'

export default function MainLayout({ children }: Readonly<Props>) {
  return (
    <div className='w-dvw min-h-dvh flex flex-col'>
      <MainHeader />
      <main className='flex-1'>{children}</main>
    </div>
  )
}

type Props = { children: React.ReactNode }
