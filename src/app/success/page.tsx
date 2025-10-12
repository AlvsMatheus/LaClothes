import React from 'react'
import icons from '.'
import Image from 'next/image'
import Link from 'next/link'
import ButtonFill from '../components/ButtonFill'

const Page = () => {
  return (
    <article className='flex flex-col gap-20 justify-center items-center min-h-screen w-full bg-[url(/hero-background.jpg)]'>
      <section className='flex flex-col justify-center items-center h-full w-full gap-4'>
        <Image src={icons.check} alt='check' height={150} width={150}/>
        <p className='text-green-300 text-center text-3xl font-extralight'>Pagamento Aprovado com Sucesso</p>
      </section>
      <section className=''>
        <Link href="/">
          <ButtonFill 
          label="Voltar à homepage"
          bg="bg-white"
          bgmask="bg-green-400"
          font="extralight"
          textColor="black"
          textColorHover='white'
          >
          </ButtonFill>
        </Link>
      </section>
    </article>
  )
}

export default Page
