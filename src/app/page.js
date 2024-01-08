import Form from '@/components/Form'
import ProfessionHome from '@/components/ProfessionHome'
import Link from 'next/link'

const Home = () => {

  const handleButton = (e) => {

  }
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Adjunta tus datos</h1>
      <h3>Fundación Misioneros Divina Redención San Felipe Neri</h3>
      <ProfessionHome />
    </main>
  )
}

export default Home
