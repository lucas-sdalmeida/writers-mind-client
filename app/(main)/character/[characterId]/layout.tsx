import style from './CharacterLayout.module.css'

export default function CharacterLayout({ attributes }: Readonly<Props>) {
  return (
    <div className={ style.characterLayout }>
      <div className={ style.tabs }>
        { attributes }
      </div>

      <div className={ style.drawings }>

      </div>
    </div>
  )
}

type Props = {
  arcs: React.ReactNode,
  attributes: React.ReactNode,
  biography: React.ReactNode,
  dimensions: React.ReactNode,
}
