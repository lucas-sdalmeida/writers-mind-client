import Image from 'next/image'
import { UserRound } from 'lucide-react'

export default function ProfilePicture({ src, radius }: Readonly<Props>) {
  const actualRadius = radius ?? 48

  return (
    <div
      className={`bg-[#10c3e2] overflow-hidden flex justify-center items-center`}
      style={{
        width: actualRadius,
        height: actualRadius,
        borderRadius: actualRadius / 2,
      }}
    >
      {
        src
          ? <Image
              src={src}
              alt={"User's profile picture"}
              width={actualRadius}
              height={actualRadius}
            />
          : <UserRound size={actualRadius * .75} strokeWidth={1} />
      }
    </div>
  )
}

type Props = { src?: string; radius?: number }
