import React from 'react'

const page = () => {
  return (
    <article className='h-[100dvh] w-full bg-[url(/hero-background.jpg)] mt-20'>
      <section className='flex justify-center items-center w-full h-full px-15'>
        <section className='flex relative flex-col gap-4 md:flex-row h-[60%] w-full '>
            <section className='w-[65%] bg-white/30 backdrop-blur-md rounded-2xl'>
                {/*Map dos itens*/}
            </section>
            <section className='w-[35%] h-100 bg-white/30 backdrop-blur-md rounded-2xl'>
                 {/*section de pagamento*/}
            </section>
        </section>
      </section>
    </article>
  )
}

export default page
