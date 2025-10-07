"use client"
import { useEffect, useState } from 'react'
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth"
import { auth, db } from '../config/config-firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import Sign from '../sign/Sign'
import ItemCart from './ItemCart';
import type { ProductCart } from './CartItemsType';
import ItemCartMobile from './ItemCartMobile';



const page = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<ProductCart[]>([])

  {/*lOGIN*/}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user)
      setLoading(false)
    })

  return () => unsubscribe();
  }, [])

   useEffect(() => {
      if(!firebaseUser) return
      
      const cartRef = collection(doc(db, "users", firebaseUser.uid), "cart")

      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const items = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as ProductCart[];
        setCartItems(items)
      })

      return () => unsubscribe()
    }, [firebaseUser])

  if(loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Carregando...
      </div>
    )
  }

  if(!firebaseUser) {
    return (
      <Sign/>
    )
  }

  return (
    <article className='flex items-center min-h-screen w-full bg-[url(/hero-background.jpg)] mt-20'>
      {
        cartItems.length === 0 ? 
        (
          <div className='flex justify-center items-center h-100 w-full bg-white'>
            <p className='text-4xl font-bold'>
              Seu carrinho está vazio.
            </p>
          </div>
        ) :
        (
          <article className='flex flex-col md:flex-row h-full gap-4 w-full items-start justify-center px-10 my-20'>
            <section className='flex flex-col justify-center gap-10 items-center w-full md:w-[70%] '>
              {
                cartItems.map((item, index) => (
                  <ItemCart
                   key={index}
                   item={item}
                   userId={firebaseUser.uid}
                   />
                ))
              }
              {
                cartItems.map((item, index) => (
                  <ItemCartMobile 
                   key={index} 
                   item={item}
                   userId={firebaseUser.uid}
                   />
                ))
              }

            </section>
            <section className='w-full md:w-[30%] h-100 bg-white/10 backdrop-blur-2xl rounded-2xl'>
                

            </section>
        </article>
        )
      }
    </article>
  )
}

export default page
