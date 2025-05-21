import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Writer's Mind",
  description:
    'A website for helping author to see their stories becoming true',
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='pt-br'>
      <body>{children}</body>
    </html>
  )
}

type Props = { children: React.ReactNode }
