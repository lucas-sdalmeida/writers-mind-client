import Tabs from './components/Tabs'
import style from './CharacterLayout.module.css'

export default function CharacterLayout({
  attributes,
  biography,
  arcs,
}: Readonly<Props>) {
  return (
    <div className={style.characterLayout}>
      <Tabs className={style.tabs} tabs={[attributes, biography, arcs]} />

      <div className={style.drawings}></div>
    </div>
  )
}

type Props = {
  arcs: React.ReactNode
  attributes: React.ReactNode
  biography: React.ReactNode
  dimensions: React.ReactNode
}
