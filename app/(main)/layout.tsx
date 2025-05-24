import MainHeader from './components/MainHeader'

export default function MainLayout({ children }: Readonly<Props>) {
  return (
    <div className='w-dvw min-h-dvh grid grid-rows-[auto_1fr]'>
      <MainHeader />
      <main className='row-start-2'>{children}</main>
    </div>
  )
}

type Props = { children: React.ReactNode }
