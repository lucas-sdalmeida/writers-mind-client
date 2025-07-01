'use client'

import Link from 'next/link'
import { Inter } from 'next/font/google'

import ProfilePicture from '../ProfilePicture'
import { Author, getUser } from '../../api/getUser'
import { useEffect, useRef, useState } from 'react'

const inter = Inter({ weight: '600', subsets: ['latin'] })

export default function AuthorInfo({
  orientation,
  hidePseudonym,
}: Readonly<{
  orientation: Orientation
  hidePseudonym?: boolean
}>) {
  const orientationClass =
    orientation == Orientation.LEFT
      ? 'flex-row justify-start'
      : 'flex-row-reverse justify-end'
  const [user, setUser] = useState({} as Author)
  const id = useRef(localStorage.getItem('userId')!)

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await findCurrentUser(id.current))
    }
    fetchUser()
  }, [])

  return (
    <div>
      <Link
        href='/author/1'
        className={`${inter.className} flex items-center gap-2 ${orientationClass} text-black decoration-0`}
      >
        <UsernameAndPseudonym
          user={user}
          className={orientationClass}
          hidePseudonym={hidePseudonym}
        />
        <ProfilePicture radius={36} src={user.pictureUrl} />
      </Link>
    </div>
  )
}

export enum Orientation {
  LEFT,
  RIGHT,
}

async function findCurrentUser(authorId: string) {
  return await getUser(authorId)
}

function UsernameAndPseudonym({
  user,
  className,
  hidePseudonym,
}: Readonly<UsernameAndPseudonymProps>) {
  return (
    <div className={`py-1 flex flex-col justify-center ${className}`}>
      <p className='text-sm font-bold'>{user.name}</p>
      {user.pseudonym && !hidePseudonym && (
        <p className='text-[.65rem] font-bold text-[#444444]'>
          {user.pseudonym}
        </p>
      )}
    </div>
  )
}

type UsernameAndPseudonymProps = {
  user: { name: string; pseudonym?: string }
  className: string
  hidePseudonym?: boolean
}
