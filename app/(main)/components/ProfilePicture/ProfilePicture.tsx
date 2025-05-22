import Image from 'next/image'

export default function ProfilePicture({ src, radius }: Readonly<Props>) {
  const actualRadius = radius ?? 48

  return (
    <div
      className={`bg-[#10c3e2] overflow-hidden`}
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
