import Image from 'next/image'
import style from './ProfilePicture.module.css'

export default function ProfilePicture({ src, radius }: Readonly<Props>) {
  const actualRadius = radius ?? 48

  return (
    <div
      className={`${style.picture}`}
      style={{
        width: actualRadius,
        height: actualRadius,
        borderRadius: actualRadius / 2,
      }}
    >
      <Image
        src={src}
        alt={"User's profile picture"}
        width={actualRadius}
        height={actualRadius}
      />
    </div>
  )
}

type Props = { src: string; radius?: number }
