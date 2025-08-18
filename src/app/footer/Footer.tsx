import React from 'react'
import Image from 'next/image'
import { logoGithub, logoLinkedin } from '@/assets'

const Footer = () => {
  return (
    <article className='flex flex-col gap-5 md:gap-20 w-full h-100 bg-[#0e0e0e]'> 
        <section className='h-50 md:h-full px-5 py-2 md:px-0 md:py-0 grid-cols-1 md:grid md:grid-cols-2 md:items-center md:justify-items-center '>
            <ul className='text-white'>
                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
            </ul>
            <ul className='text-white'>
                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
                <li>lorem</li>
            </ul>
        </section>
        <section className='w-full grid gap-2 md:gap-0 md:grid-cols-[1fr_1fr] justify-items-center p-5 text-white'>
            <section className='flex items-center'>&copy;Matheus Alves {new Date().getFullYear()} all rights reserved</section>
            <section className='flex items-center justify-center gap-4'>
                <span>
                <a 
                target='_blank'
                href="https://www.linkedin.com/in/alvmatheuus/">
                    <Image
                    width={40}
                    height={40}
                    src={logoLinkedin.imgPath}
                    alt='Logo do Linkedin'
                    />
                </a>
                </span>
                <span>
                <a 
                target='_blank'
                href="https://github.com/AlvsMatheus">
                    <Image
                    width={40}
                    height={40}
                    src={logoGithub.imgPath}
                    alt='Logo do Github'
                    />
                </a>
                </span>
            </section>
        </section>
    </article>
  )
}

export default Footer
