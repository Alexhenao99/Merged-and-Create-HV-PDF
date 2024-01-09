'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Finish = () => {
  const router = useRouter()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('userData')
      data ? setUserData(JSON.parse(data)) : router.replace('/not_found')
    }
  }, [])

  // if (!userData) {
  //   return null; // Evita renderizar cualquier contenido si no hay datos de usuario
  // }

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Gracias por haber diligenciado el Formulario</h1>
      <p>
        El PDF que se descargó, envíelo a <a href={`mailto:waha0522@gmail.com?subject=HV de ${userData?.name} - ${userData?.profession}`}>waha0522@gmail.com</a>
      </p>
    </main>
  )
}

export default Finish
