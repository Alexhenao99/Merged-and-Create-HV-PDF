import Form from '@/components/Form'
import Image from 'next/image'
import logoFumdir from '@/icons/fumdir-logo.png'

const FormPage = ({ params }) => {
  const profession = params.professions

  return (
    <main className='flex min-h-screen flex-col items-center text-center md:pt-7'>
      <a href="https://fumdir.org" target="_blank" rel="noopener noreferrer" className='no-underline flex flex-col items-center text-center'>
        <Image src={logoFumdir} alt="Logo Fumdir" className='w-60 h-32 md:w-80 md:h-44' />
        <h2 className='text-blue_title text-lg md:text-2xl'>Fundación Misioneros Divina Redención San Felipe Neri</h2>
      </a>
      <span className='text-dark'>Nota: Subir todos los archivos solicitados en formato PDF si tiene una imagen conviértala con <a href="https://www.ilovepdf.com/es/jpg_a_pdf" target="_blank" rel="noopener noreferrer" className='no-underline text-red'>IlovePDF</a></span>
      <Form profession={profession} />
    </main>
  )
}

export default FormPage
