import Link from 'next/link'

import ProfilePicture from '../ProfilePicture'

import style from './AuthorInfo.module.css'

export default async function AuthorInfo({
  orientation,
}: Readonly<{ orientation: Orientation }>) {
  const orientationClass =
    orientation == Orientation.LEFT
      ? style.leftOrientation
      : style.rightOrientation
  const user = await findCurrentUser()

  return (
    <div>
      <Link
        href='/author/1'
        className={`${style.authorInfo} ${orientationClass} ${style.link}`}
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
    <div className={`${style.usernameAndPseudonym} ${className}`}>
      <p className={style.username}>{user.username}</p>
      {user.pseudonym && <p className={style.pseudonym}>{user.pseudonym}</p>}
    </div>
  )
}

type UsernameAndPseudonymProps = {
  user: { username: string; pseudonym?: string }
  className: string
}
