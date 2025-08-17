import ItemsSection from '../components/ItemsSection'

const Hero = () => {
  return (
    <section className='flex flex-col gap-10 bg-[url(/hero-background.jpg)]'>
      <ItemsSection label="Em alta" category="em-alta" />
      <ItemsSection label="Roupas" category="roupas" />
      <ItemsSection label="Calçados" category="calcados" />
      <ItemsSection label="Acessórios" category="acessorios" />
    </section>
  )
}

export default Hero
