'use client'
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/config-firebase';
import Sign from '../sign/Sign';
import { User as FirebaseUser } from 'firebase/auth';


const User = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user)
      setLoading(false)
    })
    return () => unsubscribe();
  }, [])

   if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Carregando...
      </div>
    )
  }

  // Se não estiver logado, mostra a tela de login
  if (!firebaseUser) {
    return <Sign />
  }


  return (
    <article className='relative bg-[url(/hero-background.jpg)] bg-fixed mt-30 bg-indigo w-[100%] h-[140dvh] md:h-[240dvh] lg:h-[140dvh]'>
        <article className='h-full w-full grid py-10 grid-rows-[600px_1fr] md:grid-rows-[350px_1fr]'>
          <section className='md:h-100 w-full grid grid-rows-[300px_1fr] md:grid-rows-1 md:grid-cols-[400px_4fr] items-center justify-items-center md:flex-row px-10 md:px-0'>
            <div className='rounded-full bg-gray-300 h-60 w-60 ' />
            <div className='backdrop-blur-md grid grid-cols-3 bg-white/5 rounded-4xl w-full md:w-[90%] h-60 '>
              <section>
                <div className='flex flex-col mt-10 items-center justify-center'>
                  <span className='text-white text-[17px] text-nowrap md:text-2xl font-extralight'>Comentários</span>
                  <span className='text-white font-bold mt-15 text-4xl'>20</span>
                </div>
              </section>
              <section>
                <div className='flex flex-col mt-10 items-center justify-center'>
                  <span className='text-white text-[17px] text-nowrap md:text-2xl font-extralight'>Salvos</span>
                  <span className='text-white font-bold mt-15 text-4xl'>56</span>
                </div>
              </section>
              <section>
                <div className='flex flex-col mt-10 items-center justify-center'>
                  <span className='text-white text-[17px] text-nowrap md:text-2xl font-extralight'>Carrinho</span>
                  <span className='text-white font-bold mt-15 text-4xl'>0</span>
                </div>
              </section>
            </div>
          </section>
          <section className='h-full w-full px-10 py-10'>
            <article className='flex flex-col h-full w-full p-4 backdrop-blur-md bg-white/5 rounded-4xl'>
              <section className='flex items-center justify-center w-full h-30 text-white font-extralight text-center text-2xl'>
                <h1>Preferências do Usuário</h1>
              </section>
              <section className='flex flex-col md:flex-row h-full w-full'>
                <section className='md:hidden px-2'>
                  <button
                  className='text-white font-bold '
                  >
                    Perfil
                  </button>
                </section>
                <section className='hidden md:block w-[20%] h-full'>
                  <ul className='flex flex-col gap-5 p-2 text-white font-bold'>
                    <li><button>Perfil</button></li>
                    <li><button>Notificações</button></li>
                    <li><button>Privacidade</button></li>
                    <li><button>Segurança</button></li>
                    <li><button>Trocar conta</button></li>
                    <li><button>Autentificação</button></li>
                    <li><button>Idioma</button></li>
                  </ul>
                </section>
                <section className='w-full md:w-[80%] h-full p-2 text-white'>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis magni doloribus eos. Amet dolores ipsam ratione quibusdam consectetur? Fuga debitis aliquid perferendis eligendi, soluta laboriosam velit corporis ipsa eaque. Facilis!</p>
                </section>
              </section>
            </article>
          </section>
        </article>
      
    </article>
  )
}

export default User
