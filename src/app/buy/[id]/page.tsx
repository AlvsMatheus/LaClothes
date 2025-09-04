"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { db } from '.././../config/config-firebase'  // ajuste o path se precisar
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import { products } from '@/app/components'

interface Produto {
  id: string
  nome: string
  price: number
  stock: number
  imgPath: string
  category: string
  emAlta?: boolean
}

const Page = () => {
  const params = useParams()
  const id = params.id as string
  const [produto, setProduto] = useState<Produto | null>(null)

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const docRef = doc(db, "products", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProduto({ ...(docSnap.data() as Produto), id: docSnap.id })
        } else {
          console.log("Produto não encontrado")
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error)
      }
    }

    if (id) fetchProduto()
  }, [id])

  if (!produto) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Carregando produto...
      </div>
    )
  }

  return (
    <article className="flex bg-[url('/hero-background.jpg')] justify-center items-center h-screen md:h-[60rem] lg:h-screen w-full py-10 mt-30">
        <div className='flex card-container w-[25rem] h-[50rem] md:w-[50rem] md:h-[50rem]'>
          <article className='flex flex-col md:flex-row md:justify-center md:items-center h-full w-full'>
            <section className='flex items-center w-[100%] md:w-[55%] h-full px-5 pt-14 md:pt-0'>
              <Image 
              src={produto.imgPath}
              alt={produto.nome}
              height={400}
              width={400}
              className='w-full h-[80%] rounded-2xl'
              />
            </section>
            <section className='flex flex-col justify-evenly items-center w-full md:w-[45%] h-[80%]'>
              <section className='flex flex-col text-center gap-6'>
                <h1 className='font-bold text-md'>{produto.nome}</h1>
                 <span className='text-2xl font-bold text-black'>
                  R$ {produto.price}
                </span>
              </section>
              <section className='flex flex-col gap-2'>
                <button className='w-full p-2 bg-green-300 rounded-2xl font-bold'>Comprar</button>
                <button className='w-full p-2 bg-black text-white rounded-2xl font-bold'>Adicionar ao carrinho</button>
              </section>
            </section>
          </article>
          {/*Back button*/}
          <div className="card-back-button">
            <button className='h-[80%] w-[80%] bg-gray-500/50 rounded-2xl'>
                <p className='text-white font-extralight'>Voltar</p>
            </button>
          </div>
        </div>
    </article>
  )
}

export default Page
