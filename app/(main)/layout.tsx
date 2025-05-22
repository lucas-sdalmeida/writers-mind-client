import MainHeader from './components/MainHeader'
import SideBar from './components/SideBar'

export default function MainLayout({ children }: Readonly<Props>) {
  return (
    <div className='w-dvw min-h-dvh grid grid-cols-[13rem_1fr] grid-rows-[auto_1fr] relative'>
      <MainHeader className='col-span-full row-start-1 relative z-[60]' />

      <SideBar className='col-start-1 row-start-2 relative z-[90]' />

      <main className='col-start-2 row-start-2 relative z-30'>{children}</main>
    </div>
  )
}

type Props = { children: React.ReactNode }
