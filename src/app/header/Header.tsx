"use client";
import Image from 'next/image';
import gsap from 'gsap';
import { heroimages } from "@/assets";
import { useState, useRef, useEffect } from 'react';
import { headInfo } from "@/app/components/index";

const Header = () => {
  const heroimage = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const handleClick = (id: number) => {
    setActiveId((prevId) =>  (prevId === id ? null : id));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!heroimage.current) return;
    gsap.fromTo(heroimage.current, 
      {
      x:-700,
      opacity:0,
      filter: 'blur(20px)',
      },
      {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
      }
)
  }, [show]);

  return (
    <header className="flex flex-col justify-center items-center w-full mt-30">
      
       <article className="hidden md:flex justify-center w-full mx-20 h-[50%] border-t border-black/10">
          <section className="flex w-[70%] justify-center items-center md:py-4 lg:py-2">
            <nav className="grid grid-cols-5">
              {headInfo.map((item) => (
                <div
                  className='relative'
                  key={item.id}
                  >
                  <button
                    onClick={() => handleClick(item.id)}
                    className="header-info"
                  >
                    {item.name}
                  </button>
                  {activeId === item.id && (
                  <article className='absolute top-10 left-0 bg-black  min-w-[27rem] rounded-2xl z-10'>
                    <section className='grid grid-cols-2 gap-x-8 gap-y-2 p-4'>
                      {item.links.map((link, index) => (
                        <a key={index} href="#" className="whitespace-nowrap font-bold text-[#fcf8e9]">{link}</a>
                      ))}
                    </section>
                  </article>
                )}
                </div>
              ))}
            </nav>
          </section>
        </article>
         <article className='flex bg-[url(/hero-background.jpg)] justify-center w-full h-170 lg:h-210 p-4'>
        {show && (
            <div
              ref={heroimage}
              className='flex justify-center items-center w-[95%]'>
              <Image
                className='w-full h-130 lg:h-190 object-cover rounded-3xl shadow-lg'
              src={heroimages.imgPath}
              alt="Hero Image"
            />
          </div>
        )}
        </article>
    </header>
  )
}

export default Header
