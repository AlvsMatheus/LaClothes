import React from 'react'
import type { ProductCart } from './CartItemsType'
import Image from 'next/image'
import {  db } from '../config/config-firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { Trash2, Minus, Plus } from "lucide-react"



interface Product {
    item: ProductCart
    userId: string
}

const ItemCart = ( { item, userId }: Product ) => {
  

  const handleIncrease = async () => {
    const itemRef = doc(db, "users", userId, "cart", item.id)
    await updateDoc(itemRef, {
      quantity: item.quantity + 1,
    })
  }

  const handleDecrease = async () => {
    const itemRef = doc(db, "users", userId, "cart", item.id)
    if (item.quantity > 1) {
      await updateDoc(itemRef, {
        quantity: item.quantity - 1,
      })
    } else {
      await deleteDoc(itemRef)
    }
  }

  const handleDelete = async () => {
    const itemRef = doc(db, "users", userId, "cart", item.id )
    await deleteDoc(itemRef)
  }


  return (
    <section className='hidden md:flex flex-col w-full p-4 gap-4 bg-white/10 backdrop-blur-2xl rounded-2xl'>
        <section className='flex justify-between items-center h-[20%] w-[100%] border-b-amber-50 '>
           <h1 className='text-white font-bold text-1xl'>
              Produto e serviço
           </h1>
        </section>
          <section className='flex justify-between items-center h-30 w-full bg-amber-50/5 rounded-2xl px-5'>
            <div className='flex gap-1'>
              <span className='text-white font-bold'>
                Valor Total:
              </span>
              <span className='text-white font-bold'>
                R$ {(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
            <div className='flex justify-center items-center gap-3 h-full'>
              <div className='flex flex-col justify-center items-center gap-4 h-full'>
                <div className='text-white font-bold'>Quantidade</div>
                <div className='flex gap-4 text-white font-bold'>
                  <button 
                  onClick={handleDecrease}
                  className='cursor-pointer p-2 bg-white/20 rounded-full hover:bg-white/40 '>
                    <Minus size={10} color="white" />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                  onClick={handleIncrease}
                  className="cursor-pointer p-2 bg-white/20 rounded-full hover:bg-white/40">
                    <Plus size={10} color="white" />
                  </button>
                </div>
              </div>
            </div>
              <button 
              className='cursor-pointer hover:scale-110 transition'
              onClick={handleDelete}
              >
                <Trash2 size={20} color='red'/>
              </button>
          </section>
          <section className='flex h-full w-full justify-center items-center bg-amber-50/5 rounded-2xl'>
              <div className='flex h-full p-4'>
                <Image
                alt={item.nome}
                src={item.imgPath}
                height={400}
                width={400}
                className='w-32 h-32  rounded'
                />
              </div>
              <div className='flex flex-col gap-8 items-center w-full h-full'>
                <p className='text-nowrap text-[20px] text-white font-bold'>
                  {item.nome}
                </p>
                <span className='font-bold text-white'>
                 R${item.price}
                </span>
              </div>
          </section>
        </section>
  )
}

export default ItemCart
