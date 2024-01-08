import Form from '@/components/Form'

const FormPage = ({ params }) => {
  const profession = params.professions

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Adjunta tus datos</h1>
      <h3>Fundación Misioneros Divina Redención San Felipe Neri</h3>
      <Form profession={profession} />
    </main>
  )
}

export default FormPage
