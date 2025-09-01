"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { navmessages } from '@/app/components/index';
import { logoImg } from "@/assets";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { db } from '../config/config-firebase';
import { getDocs, collection} from 'firebase/firestore'

interface Produto {
  id: string
  nome: string
  price: number
  stock: number
  imgPath: string
  category: string
  emAlta?: boolean
}




const NavBar = () => {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtered, setFiltered] = useState<Produto[]>([]);
  const query = (search || '').toLowerCase();
  const produtoscolecaoRef = collection(db, "products")

 useEffect(() => {
  const getProdutos = async () => {
    try{
      const data = await getDocs(produtoscolecaoRef);
      const allProdutos: Produto[] = data.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Produto, "id">),
      }));
      setProdutos(allProdutos);
    } catch(err) {
      console.error(err)
    }
  }
  getProdutos();
 },[produtoscolecaoRef])

  useEffect(() => {
    const q = query.trim();
    if (!q) { setFiltered([]); return; }
    
    setFiltered(
      produtos.filter((p) => p.nome?.toLowerCase().startsWith(q))
    );
    },[query, produtos])
  

  useEffect(() => {
    if (!textRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { x: -70, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" } // entra suave
    )
    .to(textRef.current, { duration: 1.8 }) // fica parado
    .to(textRef.current, {
      x: 70,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        setIndex((prev) => (prev + 1) % navmessages.length);
      }
    });

    return () => {
      tl.kill();
    };
  }, [index]);

 return (
  <>
    <article className="fixed top-0 left-0 w-full z-50 flex flex-col bg-[#e8e8e8]">

      <div className="h-10 bg-black flex justify-center items-center shadow-md overflow-hidden">
        <p
          ref={textRef}
          className="text-white font-extralight whitespace-nowrap px-4"
        >
          {navmessages[index].text}
        </p>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between h-20 px-4 relative">
        <button onClick={() => setSideMenu(true)}>
          <Menu />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <Image
              className="h-10 w-30"
              src={logoImg.imgPath}
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      
      {/* Desktop */}
      <div className="hidden md:flex flex-col items-center w-full py-4">
        <section className="grid grid-cols-3 justify-items-center items-center w-[85%]">
          <span className="flex relative justify-between items-center w-80 bg-stone-300/30 shadow-sm rounded-4xl p-3">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              value={search}
              className="ps-3 focus:outline-none placeholder:text-black/80 placeholder:font-semibold text-sm"
              type="text"
              placeholder="Procurar Por"
            />
            <button>
              <Search />
            </button>
            {
              search && filtered.length > 0 && (
              <section className='absolute  p-2 bg-[#e8e8e8] top-13 left-0 rounded-b-3xl'>
                {filtered.map((item) => (
                  <Link 
                  key={item.id}
                  href={`/buy/${item.id}`}> 
                  <section className='flex items-center justify-start overflow-hidden gap-10 ps-4 h-10 w-full'>
                    <Image 
                    src={item.imgPath} 
                    alt={item.nome}
                    height={10} 
                    width={50}/>
                    <p className='text-sm text-nowrap'>{item.nome}</p>
                  </section>
                  </Link>
                ))}
              </section>
              )
            }
          </span>
          <Link href="/">
            <Image
              className="h-10 w-30"
              src={logoImg.imgPath}
              alt="Logo"
            />
          </Link>
          <span className="flex gap-3">
            <Link href="/user"><User /></Link>
            <a href=""><Heart /></a>
            <a href=""><ShoppingBag /></a>
          </span>
        </section>
      </div>
    </article>

    {/* Overlay */}
    {sideMenu && (
      <div 
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setSideMenu(false)} // fecha ao clicar fora
      />
    )}

    {/* Side Menu */}
    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-black shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out
        ${sideMenu ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex justify-between items-center p-4 border-b text-white">
        <h2 className=" font-bold text-lg">Menu</h2>
        <button onClick={() => setSideMenu(false)}>X</button>
      </div>

      <ul className="flex flex-col p-4 gap-4 text-white">
        <li><Link href="/" onClick={() => setSideMenu(false)}>Início</Link></li>
        <li><Link href="/user" onClick={() => setSideMenu(false)}>Perfil</Link></li>
        <li><a href="#">Favoritos</a></li>
        <li><a href="#">Carrinho</a></li>
      </ul>
    </div>
  </>
);
}

export default NavBar;
