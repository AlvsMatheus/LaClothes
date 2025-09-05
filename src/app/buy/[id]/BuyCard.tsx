"use client"

import { ProdutosTipos } from "@/app/types"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { useEffect, useState } from "react"

interface cardItem {
  produto: ProdutosTipos
}



const BuyCard = ({produto}: cardItem) => {

  const [animation, setAnimation] = useState<boolean>(false)

  useEffect(() => {
    gsap.fromTo('.card-animated', 
    {
      x: -50,
      scale: 0,
      blur: 1,

    }, 
    {
      x: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.inOut',
      blur: 0,
    })
    setAnimation(true)
  }, [])
  
  useEffect(() => {
    if (animation) {
      gsap.fromTo('.cascade-effect', 
        {
          x: -10,
          filter: 'blur(10px)'

        },
        {
          x:0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.5,
        }
      )
    }
  })

  return (
    <div className="card-animated">
      <div className='flex card-container w-[25rem] h-[50rem] md:w-[50rem] md:h-[50rem]'>
          <article className='flex flex-col md:flex-row md:justify-center md:items-center h-full w-full'>
            <section className='cascade-effect flex items-center w-[100%] md:w-[55%] h-full px-5 pt-14 md:pt-0'>
              <Image
              src={produto.imgPath}
              alt={produto.nome}
              height={400}
              width={400}
              className='w-full h-[80%] rounded-2xl'
              />
            </section>
            <section className='flex flex-col justify-evenly items-center w-full md:w-[45%] h-[80%]'>
              <section className='cascade-effect flex flex-col text-center gap-6'>
                <h1 className='font-bold text-md'>{produto.nome}</h1>
                 <span className='text-2xl font-bold text-black'>
                  R$ {produto.price}
                </span>
              </section>
              <section className='cascade-effect flex flex-col gap-2'>
                <button className='w-full p-2 bg-green-300 rounded-2xl font-bold'>Comprar</button>
                <button className='w-full p-2 bg-black text-white rounded-2xl font-bold'>Adicionar ao carrinho</button>
              </section>
            </section>
          </article>
          {/*Back button*/}
          <div className="card-back-button">
            <Link
            href="/"
            className='flex justify-center items-center h-[80%] w-[80%] bg-gray-500/50 rounded-2xl hover:scale-110 hover:border-1 hover:border-amber-50/40 transition-all ease-in-out duration-100'>
                <p className='text-white font-extralight'>Voltar</p>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default BuyCard
