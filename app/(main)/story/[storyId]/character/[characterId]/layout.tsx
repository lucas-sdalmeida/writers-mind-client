import style from './CharacterLayout.module.css'

export default function CharacterLayout({ arcs }: Readonly<Props>) {
  return (
    <div className={ style.characterLayout }>
      <div className={ style.tabs }>
        { arcs }
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
