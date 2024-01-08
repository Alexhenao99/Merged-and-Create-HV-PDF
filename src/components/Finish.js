'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Finish = () => {
  const router = useRouter()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('userData')
    data ? setUserData(JSON.parse(data)) : null
  }, [])

  // Si no hay datos, redirige a la página de error 404
  if (!userData) {
    // Esto redirigirá a la página de error 404
    router.replace('/not_found');
    return null;
  }

  window.addEventListener('beforeunload', function () {
    localStorage.clear() // Limpia todo el localStorage al cerrar la página
  })

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Gracias por haber diligenciado el Formulario</h1>
      <p>
        El PDF que se descargó, envíelo a <a href={`mailto:waha0522@gmail.com?subject=HV de ${userData.name} - ${userData.profession}`}>waha0522@gmail.com</a>
      </p>
    </main>
  )
}

export default Finish
