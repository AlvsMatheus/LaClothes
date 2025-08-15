import React from 'react'

const Footer = () => {
  return (
    <article className='flex flex-col gap-20 w-full h-100 bg-[#0e0e0e]'> 
        <section className='h-full p-5 md:p-0 grid-cols-1 md:grid md:grid-cols-2 md:items-center md:justify-items-center '>
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
        <section className='w-full grid grid-cols-3 justify-items-center p-5 text-white'>
            <section>LOGO SEILA</section>
            <section>All rights reserved</section>
            <section>LOGO SEI LA</section>
        </section>
    </article>
  )
}

export default Footer
