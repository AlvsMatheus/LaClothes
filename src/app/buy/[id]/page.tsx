"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from '.././../config/config-firebase'  // ajuste o path se precisar
import { doc, getDoc } from 'firebase/firestore'
import BuyCard from './BuyCard'
import type { ProdutosTipos } from '@/app/types'
import { loadingImg } from '@/assets'
import Image from 'next/image'

const Page = () => {
  const params = useParams()
  const id = params.id as string
  const [produto, setProduto] = useState<ProdutosTipos | null>(null)

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const docRef = doc(db, "products", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProduto({ ...(docSnap.data() as ProdutosTipos), id: docSnap.id })
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
      <div className="flex bg-black justify-center items-center h-screen text-white">
         <Image
          src={loadingImg.imgPath} 
          alt="loading gif"
          height={100}
          width={100}
          unoptimized={true} 
        />
      </div>
    )
  }

  return (
    <article className="flex bg-[url('/hero-background.jpg')] justify-center items-center min-h-screen w-full py-10 mt-30">
        {produto && <BuyCard produto={produto}/>}
    </article>
  )
}

export default Page
