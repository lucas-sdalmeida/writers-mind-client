import type { Metadata } from 'next'
import './globals.css'
import style from './main.module.css'
import Header from './components/Header'

export const metadata: Metadata = {
  title: "Writer's Mind",
  description:
    'A website for helping author to see their stories becoming true',
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='en'>
      <body className={ `${style.root} antialiased` }>
        <Header />
        {children}
      </body>
    </html>
  )
}

type Props = { children: React.ReactNode }
