'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products, ProductType } from '.'
gsap.registerPlugin(ScrollTrigger)

interface ItemsSectionProps {
  label: string;
  category: keyof typeof products;
}

const ItemsSection = ({ label, category }: ItemsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const productList: ProductType[] = products[category]

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
          }
        }
      )
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <article
      ref={sectionRef}
      className='flex flex-col md:h-[180dvh] lg:h-[100dvh] w-full py-10'
    >
      <section className='flex justify-start items-center w-full'>
        <div className='flex flex-col gap-10 justify-center items-center ps-10 md:ps-20'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-[#e8e8e8] font-bold text-5xl'>
              {label}
            </h1>
            <div className='w-[90%] h-1 bg-[#e8e8e8]' />
          </div>
          <div className='flex w-full'>
            <a
              className='relative group w-30 border-2 border-sky-100 rounded overflow-hidden'
              href="#"
            >
              <h1 className='relative z-10 text-white group-hover:text-black text-[18px] font-extralight leading-5 px-3 py-2 transition-all ease-in-out duration-500'>
                VER TODOS
              </h1>
              <div className='absolute top-0 left-0 w-[0%] group-hover:w-[100%] h-full bg-amber-50 transition-all ease-in-out duration-500' />
            </a>
          </div>
        </div>
      </section>
      <section>
        <section className='hidden lg:flex justify-end w-full h-20'>
          <div className='h-full w-40 bg-amber-50'>
          </div>
        </section>
        <section className='flex items-center w-full overflow-auto scrollbar-custom backdrop-blur-sm h-140'>
          <div>
            <section className='w-[2000px] grid grid-cols-20 gap-90 px-10'>
              {productList.map((product, index) => (
                <a 
                href="#"
                key={index}
                >

                  <div
                    className='
                    flex flex-col gap-2 items-center w-[300px] h-[500px]
                    shadow-md bg-gray-200 rounded-2xl overflow-hidden
                    transition-transform duration-300 hover:scale-105 hover:shadow-indigo-700/70 hover:shadow-lg'
                  >
                   <Image
                    src={product.imgPath}
                    alt={product.name || 'Produto'}
                    width={300}
                    height={360}
                    className='w-full h-[85%] object-cover'
                  />
                    <div className='flex flex-col w-full ps-2 items-start'>
                      <p className='text-sm font-extralight'>{product.name}</p>
                      <span className='font-extralight text-black'>
                        R$ <strong className='font-bold'>{product.price}</strong>
                        </span>
                    </div>
                  </div>
                </a>
              ))}
            </section>
          </div>
        </section>
      </section>
    </article>
  )
}

export default ItemsSection
