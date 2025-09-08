'use client'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { db } from '../config/config-firebase'
import { getDocs, collection } from 'firebase/firestore'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ItemsCard from './ItemsCard'
import type { ProdutosTipos, ItemsSectionProps } from '../types/index'
gsap.registerPlugin(ScrollTrigger)


const ItemsSection = ({label, category}: ItemsSectionProps) => {
  const [produtos, setProdutos] = useState<ProdutosTipos[]>([])
  const produtoscolecaoRef = collection(db, "products")
  const scrollRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState<boolean>(false)

  useEffect(() => {
    const getProdutos = async () => {
    try{
    const data = await getDocs(produtoscolecaoRef)
    const filteredData: ProdutosTipos[] = data.docs.map((doc) => ({
      ...doc.data() as ProdutosTipos,
       id: doc.id
      }));

      if (category === 'em-alta') {
        setProdutos(filteredData.filter(item => item.emAlta === true))
      } else {
        const produtosFiltrados = filteredData.filter(item => item.category === category)
        setProdutos(produtosFiltrados)
      }
    } catch(err) {
      console.error(err)
    }
  }
  getProdutos();
  }, [category])

  

  const sectionRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none none',
            scrub: false,
            markers: false,
            onEnter: () => {
                setUnderline(true)
            }
          }
        }
      )
    }, element)
    return () => ctx.revert()
  }, []);

  useEffect(() => {
  if (!produtos.length) return;

  const ctx = gsap.context(() => {
    gsap.from(".card-item", {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.2, // cada card demora 0.2s a mais
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }, sectionRef); // usa sectionRef como contexto

  return () => ctx.revert();
}, [produtos]);


 

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 1000;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <article
      ref={sectionRef}
      className='flex flex-col min-h-screen py-10'
    >
      <section className='flex justify-start items-center w-full'>
        <div className='flex flex-col gap-10 justify-center items-center ps-10 md:ps-20'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-[#e8e8e8] font-bold text-5xl'>
              {label}
            </h1>
            <div className={`h-1 bg-[#e8e8e8] transition-all ease-in-out duration-1000 ${underline ? 'w-[100%]' : 'w-[0%]'}`} />
          </div>
          <div className='flex w-full'>
            <a
              className='relative group w-30 border-2 border-sky-100 rounded overflow-hidden'
              href="#"
            >
              <h1 className='relative z-10 text-white group-hover:text-black text-[18px] font-extralight leading-5 px-3 py-2 transition-all ease-in-out duration-500'>
                VER TODOS
              </h1>
              <div 
              className='absolute top-0 left-0 w-[0%] group-hover:w-[100%]
               h-full bg-amber-50 transition-all ease-in-out duration-500' />
            </a>
          </div>
        </div>
      </section>
      <section>
        {/* move to right and left */}
        <section className='hidden lg:flex justify-end w-full h-20'>
          <div className='flex justify-between items-center p-6 h-full w-40 text-white'>
            <button
            className='group hover:cursor-pointer'
            onClick={() => scroll("left")}>
              <ArrowLeft 
               height={40}
               width={40}
               className='group-hover:scale-120 transition-all ease-in-out '/>
            </button>
            <button
            className='group hover:cursor-pointer'
            onClick={() => scroll("right")}>
              <ArrowRight 
              height={40} 
              width={40} 
              className='group-hover:scale-120 transition-all ease-in-out'/>
            </button>
          </div>
        </section>
        <section 
        ref={scrollRef}
        className='flex items-center w-full overflow-auto scrollbar-custom backdrop-blur-sm h-140'>
          <div>
            <section className='w-[2000px] grid grid-cols-20 gap-90'>
              {produtos.map((item) => (
                <Link
                href={`/buy/${item.id}`}
                key={item.id}
                >
                  <ItemsCard item={item}/>
                </Link>
              ))}
            </section>
          </div>
        </section>
      </section>
    </article>
  )
}

export default ItemsSection
