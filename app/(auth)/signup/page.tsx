'use client'

import { Quicksand } from 'next/font/google'
import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'

import { InputField } from '@/app/(main)/components/InputField'
import { ConfirmButton } from '@/app/(main)/components/Button'
import ProfilePicture from '@/app/(main)/components/ProfilePicture'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUsers } from '../api/getUsers'
import { createUser } from '../api/createUser'

const quicksand = Quicksand({ weight: '400', subsets: ['latin'] })

export default function SignUpPage() {
  const router = useRouter()

  const [credentials, setCredentials] = useState({
    name: '',
    pseudonym: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [error, setError] = useState(undefined as string | undefined)

  const handleSignUp = async () => {
    if (credentials.name === '') {
      setError('O nome precisa ser fornecido')
      return
    }
    if (credentials.email === '') {
      setError('O email precisa ser fornecido')
      return
    }
    if (credentials.password === '') {
      setError('A senha precisa ser fornecida')
      return
    }
    if (credentials.passwordConfirmation !== credentials.password) {
      setError('A senha e a confirmação não possuem valores diferentes')
      return
    }

    const users = await getUsers()

    if (users.some((u) => u.email === credentials.email)) {
      setError('Já existe um usuário com esse email!')
      return
    }

    const id = await createUser(credentials)
    window.localStorage.setItem('authorId', id)

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
      <span
        className={`${quicksand.className} text-xs col-start-1 w-full pb-2 flex items-end`}
      >
        <p className='w-full text-center'>
          Imagem de{' '}
          <Link
            className='underline'
            href='https://pixabay.com/pt/users/pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1840276'
          >
            Pexels
          </Link>{' '}
          por{' '}
          <Link
            className='underline'
            href='https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1840276'
          >
            Pixabay
          </Link>
        </p>
      </span>

      <div className='col-start-2 col-span-full w-full h-full bg-[#f6f6f6ee] flex flex-col justify-center items-center gap-12'>
        <div className='w-1/2 grid-cols-3'>
          <button
            className='flex items-center gap-2'
            onClick={() => router.back()}
          >
            <ArrowLeft color='#404040' />
            Voltar
          </button>

          <div className='col-start-2 w-full flex justify-center items-center'>
            <ProfilePicture radius={48} />
          </div>
        </div>

        <form className='w-1/2'>
          <InputField
            name='name'
            className='mb-3'
            label='Nome:'
            value={credentials.name}
            onChange={(v) => {
              setError(undefined)
              setCredentials({ ...credentials, name: v as string })
            }}
          />

          <InputField
            name='pseudonym'
            className='mb-3'
            label='Pseudônimo:'
            placeholder='(Opcional)'
            value={credentials.pseudonym}
            onChange={(v) => {
              setError(undefined)
              setCredentials({ ...credentials, pseudonym: v as string })
            }}
          />

          <InputField
            name='email'
            className='mb-3'
            label='Email:'
            value={credentials.email}
            onChange={(v) => {
              setError(undefined)
              setCredentials({ ...credentials, email: v as string })
            }}
          />

          <InputField
            name='password'
            className='mb-3'
            type='password'
            label='Senha:'
            value={credentials.password}
            onChange={(v) => {
              setError(undefined)
              setCredentials({ ...credentials, password: v as string })
            }}
          />

          <InputField
            name='passwordConfirmation'
            className='mb-3'
            type='password'
            label='Confirmação de Senha:'
            value={credentials.passwordConfirmation}
            onChange={(v) => {
              setError(undefined)
              setCredentials({
                ...credentials,
                passwordConfirmation: v as string,
              })
            }}
          />
        </form>

        <ConfirmButton className='w-1/2' onClick={handleSignUp}>
          Criar Conta
        </ConfirmButton>

        {error && (
          <span
            className={`${quicksand.className} px-2 py-1 rounded-lg shadow-md bg-[#e21010] text-white fixed right-2 top-2`}
          >
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
