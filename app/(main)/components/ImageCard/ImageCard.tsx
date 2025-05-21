import Image from 'next/image'
import style from './ImageCard.module.css'

export default function ImageCard({
  src,
  alt,
}: Readonly<{ src?: string; alt?: string }>) {
  return (
    <div className={style.imageCard}>
      {src && <Image src={src} alt={alt ?? ''} />}
    </div>
  )
}
