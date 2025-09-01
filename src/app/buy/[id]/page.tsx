"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { db } from '.././../config/config-firebase'  // ajuste o path se precisar
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'

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
    <article className="flex bg-[url('/hero-background.jpg')] justify-center h-screen w-full py-10 mt-30">
      <article className='containerr'>
        <article className='card'>
          <section className='cardimg'>
            <Image
            src={produto.imgPath}
            alt={produto.nome}
            fill
            className='w-full h-full object-cover'
            />
          </section>
          <section className="tag">
            <p>
              <span>
                <Link href="/">Voltar</Link>
                </span>
              </p>
          </section>
          <div className="curve-one"></div>
          <div className="curve-two"></div>
        </article>
      </article>
    </article>
  )
}

export default Page
