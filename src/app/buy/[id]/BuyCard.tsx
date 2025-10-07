"use client"

import { auth, db } from "@/app/config/config-firebase"
import { doc, setDoc } from "firebase/firestore"
import { ProdutosTipos } from "@/app/types"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { useEffect, useState } from "react"
import ButtonFill from "@/app/components/ButtonFill"

interface cardItem {
  produto: ProdutosTipos
}



const BuyCard = ({produto}: cardItem) => {

  const handleAddToCart = async (produto: ProdutosTipos) => {
    const user = auth.currentUser
    if (!user) {
      alert("Você precisa estar logado para adicionar ao carrinho")
      return
    }
    try {
    // usar ID do produto para o documento do carrinho
    const itemRef = doc(db, "users", user.uid, "cart", produto.id)
    await setDoc(itemRef, {
      ...produto,
      quantity: 1,
      addedAt: new Date(),
    }, { merge: true }) // merge evita sobrescrever caso já exista
    console.log("Produto adicionado ao carrinho")
  } catch(err) {
    console.error(err)
  }
  }


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
      <div className='flex card-container w-[25rem] h-[55rem] md:w-[50rem] md:h-[50rem] hover:scale-104 transition-all duration-150 ease-in-out '>
          <article className='flex flex-col md:flex-row md:justify-center md:items-center h-full w-full '>
            <section className='cascade-effect flex items-center w-full md:w-[55%] h-full px-5 pt-14 md:pt-0'>
              <Image
              src={produto.imgPath}
              alt={produto.nome}
              height={400}
              width={400}
              className='w-full h-[80%] rounded-2xl'
              />
            </section>
            <section className='flex flex-col justify-evenly items-center w-full md:w-[45%] h-[80%]'>
              <section className='cascade-effect w-full md:w-[auto] flex flex-col text-center gap-5 ps-5 md:ps-0'>
                <div className="flex flex-col gap-2">
                  <h1 className='font-bold text-md'>{produto.nome}</h1>
                   <span className='text-2xl font-bold text-black'>
                    R$ {produto.price}
                  </span>
                </div>
                <div className="flex md:flex-col justify-start items-start gap-2 h-[auto] md:h-20 w-full">
                  <span className="font-bold">
                    Cor
                  </span>
                  <div className="rounded-2xl h-5 w-5 border-1 p-[2px]">
                    <div className="rounded-2xl h-full w-full bg-black"/>
                  </div>
                </div>
                <section className="flex md:flex-col justify-start items-start gap-2 h-[auto] md:h-20 w-full">
                  <span className="font-bold">
                    Tamanho
                  </span>
                  <div className="flex gap-3 w-full">
                    <div className="rounded-2xl h-7 w-7 border-1 bg-black p-1">
                    <div className="flex items-center justify-center rounded-2xl h-full w-full">
                      <span className="text-sm text-white">
                        P
                      </span>
                    </div>
                    
                  </div>
                   <div className="rounded-2xl h-7 w-7 border-1  p-1">
                    <div className="flex items-center justify-center rounded-2xl h-full w-full">
                      <span className="text-sm">
                        M
                      </span>
                    </div>
                    
                  </div>
                   <div className="rounded-2xl h-7 w-7 border-1 p-1">
                    <div className="flex items-center justify-center rounded-2xl h-full w-full">
                      <span className="text-sm ">
                        G
                      </span>
                    </div>
                    
                  </div>
                   <div className="rounded-2xl h-7 w-7 border-1 p-1">
                    <div className="flex items-center justify-center rounded-2xl h-full w-full">
                      <span className="text-sm ">
                        GG
                      </span>
                    </div>
                  </div>
                  </div>
                </section>
              </section>
              <section className='cascade-effect flex flex-col w-[80%] px-4 gap-2'>
                <Link
                 className="h-full w-full"
                 href="/payment"
                >
                  <div className="h-full w-full">
                    <ButtonFill
                     label="Comprar" bg="green-300" bgmask="green-400" font="bold" textColor="black" textColorHover="black"/>
                  </div>
                </Link>
                <ButtonFill 
                onClick={() => handleAddToCart(produto)}
                label="Adicionar ao carrinho" 
                bg="black" bgmask="white" 
                font="extralight" 
                textColor="white" 
                textColorHover="black"/>
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
