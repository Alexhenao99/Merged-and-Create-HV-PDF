import Form from '@/components/Form'

const FormPage = ({params}) => {
  const profession = params.professions
  console.log(profession)
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Adjunta tus datos</h1>
      <h3>Fundación misionera Divina Redención San Felipe Neri</h3>
      <Form />
    </main>
  )
}

export default FormPage