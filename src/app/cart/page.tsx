"use client";
import { useEffect, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/config-firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Sign from "../sign/Sign";
import ItemCart from "./ItemCart";
import type { ProductCart } from "./CartItemsType";
import ItemCartMobile from "./ItemCartMobile";
import PaySection from "./PaySection";
import ButtonFill from "../components/ButtonFill";
import Link from "next/link";

const page = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);

  {
    /*lOGIN*/
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;

    const cartRef = collection(doc(db, "users", firebaseUser.uid), "cart");

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as ProductCart[];
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [firebaseUser]);

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  }

  if (!firebaseUser) {
    return <Sign />;
  }

  return (
    <article className="flex items-center min-h-screen w-full bg-[url(/hero-background.jpg)] mt-20">
      {cartItems.length === 0 ? (
        <article className="flex flex-col gap-20  justify-center items-center w-full h-full">
          <section className="flex flex-col justify-center items-center h-full w-full gap-4">
            <p className="text-white text-center text-3xl font-extralight">
              Ops... Parece que seu carrinho está vazio
            </p>
          </section>
          <section className="">
            <Link href="/">
              <ButtonFill
                label="Voltar à homepage"
                bg="bg-white"
                bgmask="bg-gray-400"
                font="extralight"
                textColor="black"
                textColorHover="white"
              ></ButtonFill>
            </Link>
          </section>
        </article>
      ) : (
        <article className="flex flex-col md:flex-row h-full gap-4 w-full items-start justify-center px-10 my-20">
          <section className="flex flex-col justify-center gap-10 items-center w-full md:w-[70%] ">
            {cartItems.map((item, index) => (
              <ItemCart key={index} item={item} userId={firebaseUser.uid} />
            ))}
            {cartItems.map((item, index) => (
              <ItemCartMobile
                key={index}
                item={item}
                userId={firebaseUser.uid}
              />
            ))}
          </section>
          <section className="w-full md:w-[30%] bg-white/10 backdrop-blur-2xl rounded-2xl">
            <PaySection />
          </section>
        </article>
      )}
    </article>
  );
};

export default page;
