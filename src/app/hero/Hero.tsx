'use client'
import ItemsSection from '../components/ItemsSection'


const Hero = () => {
  return (
    <section className='flex flex-col gap-10 bg-[url(/hero-background.jpg)] '>
      <ItemsSection category="emAlta" label='Em Alta' />
      <ItemsSection category="roupas" label='Roupas' />
      <ItemsSection category="acessorios" label='Acessórios' />
      <ItemsSection category="calcados" label='Calçados' />
      <ItemsSection category="promocoes" label='Promoçoes' />
    </section>
  )
}

export default Hero
