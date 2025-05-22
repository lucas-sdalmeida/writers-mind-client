import Link from 'next/link'

import ProfilePicture from '../ProfilePicture'

export default async function AuthorInfo({
  orientation,
}: Readonly<{ orientation: Orientation }>) {
  const orientationClass =
    orientation == Orientation.LEFT
      ? 'flex-row justify-start'
      : 'flex-row-reverse justify-end'
  const user = await findCurrentUser()

  return (
    <div>
      <Link
        href='/author/1'
        className={`flex items-center gap-2 ${orientationClass} text-black decoration-0`}
      >
        <UsernameAndPseudonym user={user} className={orientationClass} />
        <ProfilePicture
          radius={36}
          src={user.pictureUrl || 'https://picsum.photos/seed/profile/40'}
        />
      </Link>
    </div>
  )
}

export enum Orientation {
  LEFT,
  RIGHT,
}

function findCurrentUser() {
  return Promise.resolve({
    username: 'User',
    pseudonym: 'pseudonym' as string | undefined,
    pictureUrl: undefined as string | undefined,
  })
}

function UsernameAndPseudonym({
  user,
  className,
}: Readonly<UsernameAndPseudonymProps>) {
  return (
    <div className={`py-1 flex flex-col justify-center ${className}`}>
      <p className='text-sm font-bold'>{user.username}</p>
      {user.pseudonym && <p className='text-[.65rem] font-bold text-[#444444]'>{user.pseudonym}</p>}
    </div>
  )
}

type UsernameAndPseudonymProps = {
  user: { username: string; pseudonym?: string }
  className: string
}
