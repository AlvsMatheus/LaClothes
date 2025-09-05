import Image from 'next/image'
import React from 'react'
import type { ProdutosTipos } from '../types/index'

interface CardItemType {
  item: ProdutosTipos;
}

const ItemsCard = ({ item }: CardItemType) => {
  return (
    <div
        className='
        card-item
        flex flex-col gap-2 items-center w-[300px] h-[500px]
        shadow-md bg-gray-200 rounded-2xl overflow-hidden
        transition-transform duration-300 hover:scale-105 hover:shadow-indigo-700/70 hover:shadow-lg'
        >
        <Image
        src={item.imgPath}
        alt={item.nome}
        width={300}
        height={360}
        className='w-full h-[85%] object-cover'
        />
        <div className='flex flex-col w-full ps-2 items-start'>
            <p className='text-sm font-extralight'>{item.nome}</p>
            <span className='font-extralight text-black'>
            R$ <strong className='font-bold'>{item.price}</strong>
            </span>
        </div>
    </div>
  )
}

export default ItemsCard
