import style from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={ style.home }>
      <header className={ style.header }>
        <h2>Salão das Histórias</h2>
      </header>

      <div className={ style.storiesList }>
        <div className={style.card }>
          <div className={ style.cardImage }>+</div>
        </div>

        <div className={ style.card }>
          <div className={ style.cardImage }></div>
          <div className={ style.storyDetailAndOptions }>
            <h4>História A</h4>
            <div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
