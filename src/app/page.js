import ProfessionHome from '@/components/ProfessionHome'
import logoFumdir from '@/icons/fumdir-logo.png'
import Image from 'next/image'

const Home = () => {

  const handleButton = (e) => {

  }
  return (
    <main className='flex flex-col h-screen items-center justify-center text-center'>
      <a href="https://fumdir.org" target="_blank" rel="noopener noreferrer" className='no-underline'>
        <Image src={logoFumdir} alt="Logo Fumdir" className='w-60 h-32 md:w-80 md:h-44' />
        <h2 className='text-blue_title text-lg md:text-2xl'>Fundación Misioneros Divina Redención San Felipe Neri</h2>
      </a>
      <h5 className='text-xs md:text-base'>Crea tu Hoja de vida según los requerimientos del Talento Humano</h5>
      <ProfessionHome />
    </main>
  )
}

export default Home
