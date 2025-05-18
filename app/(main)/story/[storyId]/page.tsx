'use client'

import style from './StoryPage.module.css'

export default function StoryPage() {
  return (
    <div className={ style.storyPage }>
      <div className={ style.drawings }>

      </div>

      <section className={ style.storyData }>
        <header className={ style.header }>
          <h2>História A</h2>
        </header>

        <form className={ style.form } onSubmit={ (e) => e.preventDefault() }>
          <div className={ style.formFields }>
            <input type="text" name="objectives" placeholder='Qual o objetivo da sua história?'/>
            <input type="text" name="themes" placeholder='Quais os temas abordados?' />
            <input type="text" name="mainPlot" placeholder='Qual a jornada principal? O que os protagonistas buscam?' />
            <input type="text" name="genres" placeholder='Em quais gêneros a história se encaixa melhor?' />
            <input type="text" name="setting" placeholder='Como é o mundo no qual ela se passa?' />

            <textarea name="summary" placeholder='Como você resumiria sua história?'></textarea>
          </div>
          <div className={ style.formControls }>
            <button>Salvar</button>
          </div>
        </form>
      </section>
    </div>
  )
}
