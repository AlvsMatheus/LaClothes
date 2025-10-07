import React from "react";
import type { ProductCart } from "./CartItemsType";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import {  db } from "../config/config-firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

interface Product {
  item: ProductCart;
  userId: string;
}

const ItemCart = ({ item, userId }: Product) => {
  const handleIncrease = async () => {
    const itemRef = doc(db, "users", userId, "cart", item.id);
    await updateDoc(itemRef, {
      quantity: item.quantity + 1,
    });
  };

  const handleDecrease = async () => {
    const itemRef = doc(db, "users", userId, "cart", item.id);
    if (item.quantity > 1) {
      await updateDoc(itemRef, {
        quantity: item.quantity - 1,
      });
    } else {
      await deleteDoc(itemRef);
    }
  };

  const handleDelete = async () => {
    const itemRef = doc(db, "users", userId, "cart", item.id);
    await deleteDoc(itemRef)
  }

  return (
    <section className="md:hidden flex flex-col w-full p-4 gap-10  bg-white/10 backdrop-blur-2xl rounded-2xl">
      <div className="flex justify-between  items-center w-full p-3 ">
        <p className="text-center font-bold text-sm text-white">
          Produtos e serviços
        </p>
        <Trash2
         onClick={handleDelete}
         scale={20} color="red"/>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src={item.imgPath}
          alt={item.nome}
          width={300}
          height={300}
          className="w-30 h-30"
        />
        <p className="text-1xl text-center text-white font-bold">{item.nome}</p>
      </div>
      <div className="flex flex-col gap-2 w-full text-center ">
        <span className="text-white font-bold">Preço da unidade: {item.price} </span>
        <div className="flex flex-col gap-2">
          <span className="text-white font-bold">Valor final:</span> 
          <span className="text-white font-bold">R$ {(Number(item.price) * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 h-20">
        <div className="flex justify-center items-center w-full ">
          <p className="text-white font-bold">Quantidade</p>
        </div>
        <div className="flex justify-center items-center gap-5 w-full text-white">
          <Minus 
          onClick={handleDecrease}
          size={20} color="white" />
          <span className="text-2xl">{item.quantity}</span>
          <Plus
          onClick={handleIncrease}
          size={20} color="white" />
        </div>
      </div>
    </section>
  );
};

export default ItemCart;
