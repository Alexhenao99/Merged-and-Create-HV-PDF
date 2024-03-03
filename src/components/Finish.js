'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import logoFumdir from '@/icons/fumdir-logo.png'
import classroom from '@/icons/google-classroom.png'
import Link from 'next/link'

const Finish = () => {
  const router = useRouter()
  const [userData, setUserData] = useState(null)

  // verifica si hay datos guardados en el local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('userData')
      data ? setUserData(JSON.parse(data)) : router.replace('/not_found')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!userData) {
    return null; // Evita renderizar cualquier contenido si no hay datos de usuario
  }

  return (
    <main className='flex min-h-screen flex-col items-center text-center md:pt-7'>
      <a href="https://fumdir.org" target="_blank" rel="noopener noreferrer" className='flex flex-col items-center text-center'>
        <Image src={logoFumdir} alt="Logo Fumdir" className='w-60 h-32 md:w-80 md:h-44' />
        <h2 className='text-blue_title text-lg md:text-2xl'>Fundación Misioneros Divina Redención San Felipe Neri</h2>
      </a>
      <h1>Su Hoja de Vida ah sido descargada, ¡Gracias por diligenciar el formulario!</h1>
      <p>
        El archivo PDF se ha descargado en su dispositivo con el nombre <span className='text-blue_button'> CV de {userData?.name} - {userData?.profession}.pdf </span>.
      </p>
      <p>
        Por favor, envié el archivo al siguiente correo haciendo clic en el enlace: <a className='text-blue_button hover:text-blue_button_hover underline' href={`mailto:talentohumano@fumdir.org.com?subject=${userData?.name} - ${userData?.profession}`}> talentohumano@fumdir.org &#128270;</a>
      </p>
      <a href="https://classroom.google.com/c/NTQxOTc0NTkwNjE1?hl=es&cjc=6osma4d" target="_blank" rel="noopener noreferrer" className='flex flex-col items-center text-center'>
        <p className='text-2xl text-dark p-0 m-0'>
          Recuerde realizar el curso de Inducción o Reinducción
        </p>
        <Image src={classroom} alt="Logo Fumdir" className='m-0 py-6 w-40 h-28 md:w-60 md:h-40' />
      </a>

      <Link href={`/`} className='text-dark hover:text-white rounded-md py-3 px-7 mt-4 bg-blue_button hover:bg-blue_button_hover border-none md:py-4 md:px-7 md:mt-8 md:text-xl'>Diligencar nuevamente el formulario</Link>
    </main>
  )
}

export default Finish
