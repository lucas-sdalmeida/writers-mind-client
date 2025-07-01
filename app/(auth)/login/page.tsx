'use client'

import { Inter, Mr_Dafoe, Quicksand } from 'next/font/google'
import Link from 'next/link'

import { InputField } from '@/app/(main)/components/InputField'
import { ConfirmButton } from '@/app/(main)/components/Button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const mrDafoe = Mr_Dafoe({ weight: '400', subsets: ['latin'] })
const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })
const inter = Inter({ weight: '800', subsets: ['latin'] })

export default function LoginPage() {
  const router = useRouter()

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState(undefined as string | undefined)

  const handleLogIn = () => {
    if (credentials.email === '') {
      setError('O email precisa ser fornecido')
      return
    }
    if (credentials.password === '') {
      setError('A senha precisa ser fornecida')
      return
    }

    router.push('/story')
  }

  return (
    <div
      className='w-full h-dvh grid grid-cols-6'
      style={{
        backgroundImage: `url('login_background.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className='col-span-3 w-full h-full flex justify-center items-center relative z-10'>
        <header className='relative -translate-y-24'>
          <h1 className={`${mrDafoe.className} text-[#10c3e2] text-7xl`}>
            Writer&apos;s Mind
          </h1>
          <h4
            className={`${quicksand.className} text-white text-lg w-full text-right`}
          >
            veja sua história tomando forma
          </h4>
        </header>
      </div>

      <section className='col-start-4 col-span-2 w-full h-full bg-[#f6f6f6ee] flex flex-col justify-center items-center gap-12'>
        <header>
          <h2 className={`${inter.className} text-xl`}>Entre ou Cadastre-se</h2>
        </header>

        <form className='w-3/4'>
          <InputField
            name='email'
            className='mb-3'
            placeholder='Email'
            value={credentials.email}
            onChange={(v) => {
              setError(undefined)
              setCredentials({ ...credentials, email: v as string })
            }}
          />

          <InputField
            name='password'
            type='password'
            placeholder='Senha'
            value={credentials.password}
            onChange={(v) => {
              setError(undefined)
              setCredentials({ ...credentials, password: v as string })
            }}
          />
        </form>

        <div className='w-full flex flex-col items-center gap-2'>
          <ConfirmButton className='w-3/4' onClick={handleLogIn}>
            Entrar
          </ConfirmButton>

          <p className={`${quicksand.className} text-sm`}>
            Não tem conta?{' '}
            <Link
              href='/signup'
              className='text-[#10c3e2] underline hover:text-cyan-600'
            >
              Cadastre-se
            </Link>
          </p>
        </div>

        {error && (
          <span
            className={`${quicksand.className} px-2 py-1 rounded-lg shadow-md bg-[#e21010] text-white fixed right-2 top-2`}
          >
            {error}
          </span>
        )}
      </section>

      <span
        className={`${quicksand.className} text-white text-xs col-start-6 w-full pb-2 flex items-end`}
      >
        <p className='w-full text-center'>
          Imagem de{' '}
          <a
            className='underline'
            href='https://pixabay.com/pt/users/pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1840276'
          >
            Pexels
          </a>{' '}
          por{' '}
          <a
            className='underline'
            href='https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1840276'
          >
            Pixabay
          </a>
        </p>
      </span>
    </div>
  )
}
